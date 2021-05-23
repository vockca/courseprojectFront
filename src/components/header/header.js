import React, {useEffect} from "react";
import {Link} from "react-router-dom";

import "./header.css";
import {ServerAddress} from "../../serverAddress/serverAdress";
import UnAuthorizedHeader from "./unAuthorizedHeader";
import AuthorizedHeader from "./authorizedHeader";

const Header = (props) => {

    useEffect(async () => {
        const response = await fetch(`${ServerAddress.address}/userInfo/${localStorage.getItem('LOGIN')}`,
            {
                method: 'GET',
                headers: {
                    'Authorization': localStorage.getItem('USER'),
                },
            },
        );

        const ResponseJSON = await response.json();
        //make a way to cover the answer if user not authorized
        if (ResponseJSON.data) {
            console.log(ResponseJSON.data);
            props.defineCurrentUser(ResponseJSON.data);
        }
    }, []);


    if (props.isAuthorized) {
        return <AuthorizedHeader unauthorizeUser={props.unauthorizeUser} userInfo={props.userInfo}/>
    } else {
        return <UnAuthorizedHeader />
    }
}

export default Header;