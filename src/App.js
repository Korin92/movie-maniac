import './App.css'
import {useState} from 'react'
import NavBar from './components/nav-bar/component'
import Routes from './routes/Routes'
import { BrowserRouter as Router } from 'react-router-dom'
import Footer from './components/footer/component'
import { auth } from './utils/firebase'

import { onAuthStateChanged, signOut } from 'firebase/auth'

function App() {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [reloadApp, setReloadApp] = useState(false);
  
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
        <NavBar user={user}/>
        <Routes user={user}  setReloadApp={setReloadApp}  />
      </Router>
      <Footer />
    </>
  )
}

export default App
