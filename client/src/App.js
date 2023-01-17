import React, {useEffect} from 'react';
import './App.css';
import {onAuthStateChanged} from "firebase/auth"
import {auth} from "./config/firebase-config";
import SignIn from "./components/SignIn";
import {Route, Routes, useNavigate} from "react-router-dom";
import SignUp from "./components/SignUp";
import {useDispatch, useSelector} from "react-redux";
import {selectUserAuth, setUser, userAutoCheck} from "./redux/loginRegister";
import Profile from "./components/Profile";
function App() {


    const userAuth = useSelector(selectUserAuth);
    const dispatch = useDispatch();

    const navigate = useNavigate();


    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            dispatch(userAutoCheck(currentUser))
            dispatch(setUser(currentUser))
        })
    }, [])


    useEffect(() => {
        if (userAuth.user !== null && Object.keys(userAuth.user).length !== 0) {
            navigate("/profile")
        }
        if (userAuth.user === null) {
            navigate("/sign-in")
        }
    }, [userAuth])

    console.log(userAuth.user)
    return (
        <div className="App">
            <Routes>
                <Route path="*" element={<SignIn/>}/>
                <Route path="/sign-in/*" element={<SignIn/>}/>
                <Route path="/sign-up/*" element={<SignUp/>}/>
                <Route path="/profile/*" element={<Profile/>}/>}/>
            </Routes>

        </div>
    );
}

export default App;

