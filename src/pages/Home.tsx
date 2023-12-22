import React, { Fragment } from 'react';
import {  signOut } from "firebase/auth";
import {auth} from '../firebase';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { Chat } from '../components/Chat';
 
const Home = () => {
    const navigate = useNavigate();

    //get current user if logged in
    const user = auth.currentUser;
 
    const handleLogout = () => {               
        signOut(auth).then(() => {
        // Sign-out successful.
            navigate("/");
            console.log("Signed out successfully")
        }).catch((error) => {
         console.error("Error signing out:", error)
        });
    }
   
    return(
        <Fragment>
            <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
                <Sidebar/>
                <Chat/>
            </div>
        </Fragment>
    )
}
 
export default Home;
