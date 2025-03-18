import {Routes, Route} from 'react-router'

import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Register from './components/register/Register';
import Login from './components/login/Login';
import Catalog from './components/catalog/Catalog';
import CreatePet from './components/create/Create';

function App() {

  return (
    <div className="h-screen flex-col">
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/pets' element={<Catalog />} />
        <Route path='/add-pet' element={<CreatePet />} />
      </Routes>
      
      <Footer />
    </div>
  )
}

export default App
