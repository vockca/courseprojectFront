import React, {useEffect, useState} from "react";
import {ServerAddress} from "../../serverAddress/serverAdress";

const Profile = (props) => {

    useEffect(async () => {
        const response = await fetch(`${ServerAddress.address}/userInfo`,{
            credentials: 'include',
        });

        const ResponseJSON = await response.json();
        //make a way to cover the answer if user not authorized
        if (ResponseJSON.data) {
            props.defineCurrentUser(ResponseJSON.data);
        };
    }, []);

    return(
        <div>
        some profile
        </div>
    )
}

export default Profile;