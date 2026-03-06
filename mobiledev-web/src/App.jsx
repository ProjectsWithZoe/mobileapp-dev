import { useState } from 'react'
import './App.css'
import LandingPage from './components/LandingPage'
import PromptGenerator from './components/ComplexGenerator'

function App() {
  const [subscribed, setSubscribed] = useState(false)

  if (!subscribed) {
    return <LandingPage onSubscribe={() => setSubscribed(true)} />
  }

  return (
    <div className="flex flex-col">
      <PromptGenerator />
    </div>
  )
}

export default App
