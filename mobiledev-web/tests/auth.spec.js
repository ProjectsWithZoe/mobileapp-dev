import { test, expect } from "@playwright/test";

// Intercept all Supabase auth/otp calls and return a mock success by default.
// Individual tests override the route to simulate errors.
async function mockOtp(page, { status = 200, body = {} } = {}) {
  await page.route("**/auth/v1/otp**", (route) =>
    route.fulfill({
      status,
      contentType: "application/json",
      body: JSON.stringify(body),
    })
  );
}

// Also mock the email_exists RPC used by signUp
async function mockEmailExists(page, exists = false) {
  await page.route("**/rest/v1/rpc/email_exists**", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(exists),
    })
  );
}

test.describe("Auth modal", () => {
  let signInButton;

  test.beforeEach(async ({ page }) => {
    await mockOtp(page);
    await mockEmailExists(page, false);
    await page.goto("/");

    // The Sign In button is only rendered when NEXT_PUBLIC_SUPABASE_* env vars
    // are present at build time. Skip the whole suite if they're absent.
    signInButton = page.getByRole("button", { name: /sign in/i }).first();
    const configured = await signInButton.isVisible().catch(() => false);
    if (!configured) test.skip(true, "Supabase env vars not set — skipping auth tests");
  });

  test("sign-in button opens modal with correct heading", async ({ page }) => {
    await signInButton.click();
    await expect(page.getByRole("heading", { name: "Welcome back" })).toBeVisible();
    await expect(page.getByPlaceholder("you@example.com")).toBeVisible();
    await expect(page.getByRole("button", { name: /send magic link/i })).toBeVisible();
  });

  test("submit button is disabled with empty email", async ({ page }) => {
    await signInButton.click();
    const submit = page.getByRole("button", { name: /send magic link/i });
    await expect(submit).toBeDisabled();
  });

  test("successful OTP request shows confirmation state", async ({ page }) => {
    await signInButton.click();
    await page.getByPlaceholder("you@example.com").fill("test@example.com");
    await page.getByRole("button", { name: /send magic link/i }).click();

    await expect(page.getByText("Check your inbox")).toBeVisible();
    await expect(page.getByText("test@example.com")).toBeVisible();
  });

  test("failed OTP request shows inline error", async ({ page }) => {
    // Override the default mock to return an auth error
    await page.route("**/auth/v1/otp**", (route) =>
      route.fulfill({
        status: 422,
        contentType: "application/json",
        body: JSON.stringify({ error: "Signups not allowed", error_description: "Signups not allowed for otp" }),
      })
    );

    await signInButton.click();
    await page.getByPlaceholder("you@example.com").fill("nobody@example.com");
    await page.getByRole("button", { name: /send magic link/i }).click();

    // useAuth signIn throws a user-friendly message when shouldCreateUser:false fails
    await expect(
      page.getByText(/no account found|something went wrong/i)
    ).toBeVisible();
  });

  test("modal closes on backdrop click", async ({ page }) => {
    await signInButton.click();
    await expect(page.getByRole("heading", { name: "Welcome back" })).toBeVisible();

    // Click the backdrop (outside the modal card)
    await page.mouse.click(10, 10);
    await expect(page.getByRole("heading", { name: "Welcome back" })).not.toBeVisible();
  });

  test("modal closes on ✕ button", async ({ page }) => {
    await signInButton.click();
    await page.getByRole("button", { name: "Close" }).click();
    await expect(page.getByRole("heading", { name: "Welcome back" })).not.toBeVisible();
  });
});

test.describe("Auth modal — sign-up mode", () => {
  test.beforeEach(async ({ page }) => {
    await mockOtp(page);
    await mockEmailExists(page, false);
    await page.goto("/");

    // Only run if Supabase is configured
    const signInBtn = page.getByRole("button", { name: /sign in/i }).first();
    const configured = await signInBtn.isVisible().catch(() => false);
    if (!configured) test.skip(true, "Supabase env vars not set — skipping auth tests");
  });

  test("sign-up OTP shows confirmation for new email", async ({ page }) => {
    // Look for a sign-up trigger (e.g. a CTA on the landing page)
    const signUpButton = page
      .getByRole("button", { name: /get started|sign up|create account|free demo/i })
      .first();
    const visible = await signUpButton.isVisible().catch(() => false);
    if (!visible) test.skip(true, "No sign-up button found on page");

    await signUpButton.click();

    // Modal should open in signup or signin mode
    const emailInput = page.getByPlaceholder("you@example.com");
    await expect(emailInput).toBeVisible();
    await emailInput.fill("newuser@example.com");
    await page.getByRole("button", { name: /create account|send magic link/i }).click();

    await expect(page.getByText("Check your inbox")).toBeVisible();
  });

  test("sign-up blocked for existing email", async ({ page }) => {
    // Mock email_exists to return true (email already registered)
    await page.route("**/rest/v1/rpc/email_exists**", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(true),
      })
    );

    const signUpButton = page
      .getByRole("button", { name: /get started|sign up|create account|free demo/i })
      .first();
    const visible = await signUpButton.isVisible().catch(() => false);
    if (!visible) test.skip(true, "No sign-up button found on page");

    await signUpButton.click();
    const emailInput = page.getByPlaceholder("you@example.com");
    await expect(emailInput).toBeVisible();
    await emailInput.fill("existing@example.com");
    await page.getByRole("button", { name: /create account|send magic link/i }).click();

    await expect(
      page.getByText(/already exists|sign in instead/i)
    ).toBeVisible();
  });
});
