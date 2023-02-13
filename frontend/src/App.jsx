import Header from './components/Header'
import Main from './components/Main'
import Account from './components/Account'
import './App.css'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <div className="App">
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default App
