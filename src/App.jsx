import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

// CSS
import './App.css'

// Components
import { onAuthStateChanged, signOut } from 'firebase/auth'
import ScrollToTop from './components/scroll-top/component'
import NavBar from './components/nav-bar/component'
import Routes from './routes/Routes'
import Footer from './components/footer/component'

// Firebase
import { auth } from './utils/firebase'
import { useDebounce } from './hooks/useDebounce'

function App() {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [reloadApp, setReloadApp] = useState(false)

  const query = new URLSearchParams(useLocation().search)
  const search = query.get('search')

  const debounce = useDebounce(search, 300)

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
    <div className="App">
      <ScrollToTop />
      <header>
        <NavBar user={user} search={search} />
      </header>
      <div className="content">
        <Routes user={user} setReloadApp={setReloadApp} debounce={debounce} />
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default App
