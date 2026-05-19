import { test, expect } from "@playwright/test";

test.describe("Blog nav link", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("desktop: Blog link is visible before Contact in the nav", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === "mobile", "Blog is hidden on mobile viewport");

    const nav     = page.locator("nav").first();
    const blog    = nav.getByRole("link", { name: "Blog" });
    const contact = nav.getByRole("button", { name: "Contact", exact: true });

    await expect(blog).toBeVisible();
    await expect(contact).toBeVisible();

    const blogBox    = await blog.boundingBox();
    const contactBox = await contact.boundingBox();
    expect(blogBox.x).toBeLessThan(contactBox.x);
  });

  test("desktop: Blog link points to /blog", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === "mobile", "Blog is hidden on mobile viewport");

    const blog = page.locator("nav").first().getByRole("link", { name: "Blog" });
    await expect(blog).toHaveAttribute("href", "/blog");
  });

  test("desktop: Blog link matches Contact visual style (no border, no background)", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === "mobile", "Blog is hidden on mobile viewport");

    const blog   = page.locator("nav").first().getByRole("link", { name: "Blog" });
    const styles = await blog.evaluate((el) => {
      const cs = window.getComputedStyle(el);
      return {
        background:     cs.backgroundColor,
        borderWidth:    cs.borderWidth,
        textDecoration: cs.textDecorationLine,
      };
    });

    expect(styles.background).toBe("rgba(0, 0, 0, 0)");
    expect(styles.borderWidth).toBe("0px");
    expect(styles.textDecoration).toBe("none");
  });

  test("mobile: Blog link is hidden below sm breakpoint", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === "desktop", "Mobile-only test");

    // includeHidden so the locator can find the display:none element to assert on
    const blog = page.locator("nav").first().getByRole("link", { name: "Blog", includeHidden: true });
    await expect(blog).toBeHidden();
  });
});
