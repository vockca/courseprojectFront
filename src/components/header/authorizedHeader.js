import React from "react";
import {Link} from "react-router-dom";

import "./header.css";

const AuthorizedHeader = (props) => {

    return (
        <div key={props.userInfo} className={'header d-flex pl-3 pr-3'}>
            <div className={'mainPage d-flex align-items-center'}>
                <Link className="font-md btn btn-sm btn-outline-primary" to={"/"}>Crown Funding</Link>
            </div>

            <div className={'d-flex ml-auto align-items-center'}>
                <div className="mr-2 font-sm">You are authorized as
                    <span className="font-weight-bold ml-1">{props.userInfo['user_login']}</span>
                </div>

                <Link className="font-sm btn btn-sm btn-outline-secondary" to={`/profile/${props.userInfo['user_login']}`}> Profile </Link>
                {props.userInfo['user_isAdmin'] ? <Link className="font-sm btn btn-sm btn-outline-secondary ml-2" to={"/adminPage"}> Adminka</Link> : null}
                <button type={"button"} className="ml-2 btn btn-outline-secondary btn-sm" onClick={props.unauthorizeUser}>Log out</button>
            </div>
        </div>
    )

}

export default AuthorizedHeader;