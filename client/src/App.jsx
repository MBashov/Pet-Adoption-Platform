import { Routes, Route } from 'react-router'

import { userContext } from './contexts/userContext'

import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Register from './components/register/Register';
import Login from './components/login/Login';
import Catalog from './components/catalog/Catalog';
import CreatePet from './components/create/Create';
import NotFound from './components/404/404';
import Logout from './components/logout/Logout';
import { useState } from 'react';

function App() {

    const [auth, setAuth] = useState({});

    const authHandler = (authData) => {
        setAuth(authData);
    }
    console.log(auth);

    return (
        < userContext.Provider value={{ ...auth, authHandler }}>
            <div className="h-screen flex-col">
                <Header />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/logout' element={<Logout />} />
                    <Route path='/pets' element={<Catalog />} />
                    <Route path='/add-pet' element={<CreatePet />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>

                <Footer />
            </div>
        </userContext.Provider>
    )
}

export default App
