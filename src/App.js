import React, {useState} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

import './App.css';
import '@yaireo/tagify/dist/tagify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import SignupForm from "./components/registration/registrationWindow";
import LogInForm from "./components/authentification/authentificationWindow";
import MainPage from "./components/mainPage/mainPage";
import Header from "./components/header/header";
import UserProfile from "./components/profile/userProfile";
import AdminPage from "./components/admin/adminPage";



const App = () => {
    const [userInfo, setUserInfo] = useState(null);

    const defineCurrentUser = (userInfoObj) => {
        setUserInfo(userInfoObj);
    }

    const unauthorizeUser = () => {
        setUserInfo(null)
        localStorage.clear();
    }


    return (
        <div className="App">
            <Router>
                <Header isAuthorized={!!userInfo}
                        userInfo={userInfo}
                        defineCurrentUser={defineCurrentUser}
                        unauthorizeUser={unauthorizeUser}
                />

                <div className='mainContainer ml-4 mr-4 mt-3 mb-2'>
                    <Switch>
                        <Route path={"/SignUp"}>
                            <SignupForm/>
                        </Route>

                        <Route path={"/LogIn"}>
                            <LogInForm defineCurrentUser={defineCurrentUser}/>
                        </Route>

                        <Route path={"/MainPage"}>
                            <MainPage defineCurrentUser={defineCurrentUser} userInfo={userInfo}/>
                        </Route>

                        <Route exact path={"/"}>
                            <Redirect to={"/MainPage"}/>
                        </Route>

                        <Route path={"/profile/:login"}>
                            <UserProfile defineCurrentUser={defineCurrentUser}/>
                        </Route>

                        <Route path={"/adminPage"}>
                            <AdminPage/>
                        </Route>
                    </Switch>
                </div>
            </Router>
            <button onClick={ () => console.log(localStorage)}>cookie</button>
            <button onClick={ async () => {

                localStorage.setItem('USER', 'unAuthorized');

            }}>clear local</button>
        </div>
    );
}


export default App;