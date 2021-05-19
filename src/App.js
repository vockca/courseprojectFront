import React, {useState} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, Redirect
} from "react-router-dom";

import './App.css';

import SignupForm from "./components/registration/registrationWindow";
import LogInForm from "./components/authentification/authentificationWindow";
import MainPage from "./components/mainPage/mainPage";
import Header from "./components/header/header";
import CreateCampaignForm from "./components/createCampaign/createCampaign";
import Profile from "./components/profile/profile";
import {ServerAddress} from "./serverAddress/serverAdress";


//make history here and pass it through components
const App = () => {
    const [userInfo, setUserInfo] = useState({
        isAuthorized: false,
        user: null,
    })

    const defineCurrentUser = (userInfoObj) => {
        setUserInfo({
            isAuthorized: true,
            user: userInfoObj,
        })
    }

    const unauthorizeUser = () => {
        console.log('111');
        setUserInfo({
            isAuthorized: false,
            user: null,
        })
        localStorage.setItem('USER', 'unAuthorized');
    }

    console.log(userInfo);
    return (
        <div className="App">
            <Router>
                <Header userInfo={userInfo} unauthorizeUser={unauthorizeUser}/>

                <Link to={'/createCampaign'}>Create Campaign</Link>

                <div className={'mainContainer'}>
                    <Switch>
                        <Route path={"/createCampaign"}>
                            <CreateCampaignForm/>
                        </Route>

                        <Route path={"/SignUp"}>
                            <SignupForm/>
                        </Route>

                        <Route path={"/LogIn"}>
                            <LogInForm/>
                        </Route>

                        <Route path={"/MainPage"}>
                            <MainPage defineCurrentUser={defineCurrentUser} />
                        </Route>

                        <Route exact path={"/"}>
                            <Redirect to={"/MainPage"}/>
                        </Route>

                        <Route exact path={"/myProfile"}>
                            <Profile defineCurrentUser={defineCurrentUser} userInfo={userInfo}/>
                        </Route>
                    </Switch>
                </div>
            </Router>
            <button onClick={ () => console.log(JSON.stringify(localStorage.getItem('USER')))}>cookie</button>
            <button onClick={ async () => {

                localStorage.setItem('USER', 'unAuthorized');

            }}>clear local</button>
        </div>
    );
}

export default App;