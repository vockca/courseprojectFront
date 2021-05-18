import React from "react";
import {Link} from "react-router-dom";

import "./header.css";

const Header = (props) => {
    const isAuthorized = props.userInfo.isAuthorized;

    return(
        <div className={'header'}>
            <div className={'mainPage'}>
                <Link to={"/"}>Crown Funding</Link>
            </div>

            {!isAuthorized ?
                (<div>
                    <div className={'signingUp'}>
                        <span>Don't have an account?</span>
                        <Link to={"/SignUp"}>Sign Up</Link>
                    </div>

                    <div className={'loggingIn'}>
                        <span>Already have an account?</span>
                        <Link to={"/LogIn"}>Log In</Link>
                        <span> / </span>
                    </div>
                </div>) :
                (<div>
                    <div>You are authorized as {props.userInfo['user']['user_login']}</div>
                    <Link to={'/myProfile'}>Profile</Link>
                    <button onClick={props.unauthorizeUser}>Log out</button>
                </div>)}
        </div>
    )
}

export default Header;