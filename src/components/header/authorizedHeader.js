import React from "react";
import {Link} from "react-router-dom";

import "./header.css";

const AuthorizedHeader = (props) => {

    return (
        <div key={props.userInfo} className={'header'}>
            <div className={'mainPage'}>
                <Link to={"/"}>Crown Funding</Link>
            </div>

            <div>
                <div>You are authorized as {props.userInfo['user_login']}</div>
                <Link to={`/profile/${props.userInfo['user_login']}`}>Profile </Link>
                {props.userInfo['user_isAdmin'] ? <Link to={"/adminPage"}> Adminka</Link> : null}
                <button onClick={props.unauthorizeUser}>Log out</button>
            </div>
        </div>
    )

}

export default AuthorizedHeader;