import React, {useEffect, useState} from "react";
import {ServerAddress} from "../../serverAddress/serverAdress";

const Profile = (props) => {

    useEffect(async () => {
        let userToken = {
            token: localStorage.getItem('USER'),
        }

        const response = await fetch(`${ServerAddress.address}/userInfo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(userToken),
        },);

        const ResponseJSON = await response.json();
        //make a way to cover the answer if user not authorized
        if (ResponseJSON.data) {
            props.defineCurrentUser(ResponseJSON.data);
        }
    }, []);

    return(
        <div>
        some profile
        </div>
    )
}

export default Profile;