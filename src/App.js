import { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

//CSS
import './App.css'

//Components
import ScrollToTop from './components/scroll-top/component'
import NavBar from './components/nav-bar/component'
import Routes from './routes/Routes'
import Footer from './components/footer/component'

//Firebase
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from './utils/firebase'

function App() {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [reloadApp, setReloadApp] = useState(false)

  onAuthStateChanged(auth, (currentUser) => {
    if (!currentUser?.emailVerified) {
      signOut(auth)
      setUser(null)
    } else {
      setUser(currentUser)
    }
    setIsLoading(false)
  })

  if (isLoading) {
    return null
  }
  return (
    <>
      <Router>
        <ScrollToTop />
        <NavBar user={user} />
        <Routes user={user} setReloadApp={setReloadApp} />
      </Router>
      <Footer />
    </>
  )
}

export default App
