import React, {useEffect} from "react";
import {Link} from "react-router-dom";

import "./header.css";


const UnAuthorizedHeader = (props) => {

    return (
        <div className={'header d-flex pl-3 pr-3'}>
            <div className={'mainPage d-flex align-items-center'}>
                <Link className="font-md btn btn-sm btn-outline-primary " to={"/"}>Crown Funding</Link>
            </div>

                <div className={'d-flex ml-auto align-items-center'}>
                    <div className='signingUp d-flex align-items-center'>
                        <span className="font-sm mr-2">Don't have an account?</span>
                        <Link className="font-md btn btn-sm btn-outline-primary" to={"/SignUp"}>Sign Up</Link>
                    </div>

                    <div className='loggingIn ml-3 d-flex align-items-center'>
                        <span className="font-sm mr-2">Already have an account?</span>
                        <Link className="font-md btn btn-sm btn-outline-primary" to={"/LogIn"}>Log In</Link>
                    </div>
                </div>
        </div>
    )
}

export default UnAuthorizedHeader;