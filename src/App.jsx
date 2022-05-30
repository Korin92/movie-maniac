import React, { useState } from 'react'

// CSS
import './App.css'

// Components
import { onAuthStateChanged, signOut } from 'firebase/auth'
import ScrollToTop from './components/scroll-top/component'
import NavBar from './components/nav-bar/component'
import Routes from './routes/Routes'
import Footer from './components/footer/component'
import SearchContext from './components/search/context'
import { useSearch } from './hooks/useSearch'

// Firebase
import { auth } from './utils/firebase'

function App() {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [reloadApp, setReloadApp] = useState(false)

  const searchText = useSearch()

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
      <SearchContext.Provider value={searchText}>
        <header>
          <NavBar user={user} />
        </header>
        <div className="content">
          <Routes
            user={user}
            setReloadApp={setReloadApp}
            searchText={searchText}
          />
        </div>
      </SearchContext.Provider>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default App
