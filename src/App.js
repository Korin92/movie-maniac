import './App.css'
import NavBar from './components/nav-bar/component'
import Routes from './routes/Routes'
import { BrowserRouter as Router } from 'react-router-dom'

function App() {
  return (
    <Router>
      <NavBar />
      <Routes />
    </Router>
  )
}

export default App
