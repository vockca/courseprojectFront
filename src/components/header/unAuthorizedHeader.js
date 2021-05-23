import React, {useEffect} from "react";
import {Link} from "react-router-dom";

import "./header.css";


const UnAuthorizedHeader = (props) => {

    return (
        <div className={'header'}>
            <div className={'mainPage'}>
                <Link to={"/"}>Crown Funding</Link>
            </div>

                <div>
                    <div className={'signingUp'}>
                        <span>Don't have an account?</span>
                        <Link to={"/SignUp"}>Sign Up</Link>
                    </div>

                    <div className={'loggingIn'}>
                        <span>Already have an account?</span>
                        <Link to={"/LogIn"}>Log In</Link>
                        <span> / </span>
                    </div>
                </div>
        </div>
    )
}

export default UnAuthorizedHeader;