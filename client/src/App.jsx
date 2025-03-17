import {Routes, Route} from 'react-router'

import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Register from './components/register/Register';
import Login from './components/login/Login';

function App() {

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
      
      <Footer />
    </div>
  )
}

export default App
