import { Routes, Route } from 'react-router'
import { ToastContainer } from "react-toastify";
import UserProvider from './providers/UserProvider';

import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Register from './components/register/Register';
import Login from './components/login/Login';
import Catalog from './components/catalog/Catalog';
import CreatePet from './components/create/Create';
import NotFound from './components/404/404';
import Logout from './components/logout/Logout';
import PetDetails from './components/pet-details/PetDetails';
import EditPet from './components/edit/Edit';
import AuthGuard from './components/guards/AuthGuard';
import GuestGuard from './components/guards/guestGuard';
import AdoptionSuccess from './components/adoption-succsess/AdoptionSuccess';
import Profile from './components/profile/Profile';
import AdoptPet from './components/adopt-pet/AdoptPet';
import AdoptionProcess from './components/adoption-process/AdoptionProcess';

function App() {

    return (
        <UserProvider>
            <div className="flex flex-col min-h-screen">
                <Header />

                <Routes>
                    <Route path='/' element={<Home />} />

                    <Route path='/pets' element={<Catalog />} />
                    <Route path='/pets/:petId/details' element={<PetDetails />} />
                    <Route path='/about' element={<AdoptionProcess />} />
                    <Route element={<AuthGuard />}>
                        <Route path='/add-pet' element={<CreatePet />} />
                        <Route path='/pets/:petId/edit' element={<EditPet />} />
                        <Route path='/pets/:petId/adopt' element={<AdoptPet />} />
                        <Route path='/succesfully-adopt' element={<AdoptionSuccess />} />
                        <Route path='/profile' element={<Profile />} />
                        <Route path='/logout' element={<Logout />} />
                    </Route>
                    <Route element={<GuestGuard />}>
                        <Route path='/register' element={<Register />} />
                        <Route path='/login' element={<Login />} />
                    </Route>
                    <Route path='*' element={<NotFound />} />
                </Routes>

                <Footer />

                <ToastContainer position="top-center" autoClose={2000} />
            </div>
        </UserProvider >
    )
}

export default App
