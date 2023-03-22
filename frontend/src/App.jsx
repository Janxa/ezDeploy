import Header from './components/Header'
import './App.css'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'
import AuthContextProvider from './context/AuthProvider';
function App() {

  return (
    <AuthContextProvider>
      <div className="App h-screen">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </AuthContextProvider>
  )
}

export default App
