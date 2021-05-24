import React, {useState} from "react";
import FacebookLogin from 'react-facebook-login';
import {ServerAddress} from "../../serverAddress/serverAdress";


const FacebookAuth = (props) => {

    const responseFacebook = async (user) => {
        let values = {
            login: user.id,
            password: user.id, //problems that we define password as user id and
        };
        let response = await fetch(`${ServerAddress.address}/LogIn`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(values),
        });

        let jsonResponse = await response.json();

        if(jsonResponse.data) {
            localStorage.setItem('USER', jsonResponse.token);
            localStorage.setItem('LOGIN', user.id);
            props.defineCurrentUser(jsonResponse.data);
            props.redirectToMainPage()
        }

        props.showServerMessage(jsonResponse.msg, 2000);
    }

    return(
        <div>
                <div>
                    <FacebookLogin
                        appId="942739773232091"
                        autoLoad={true}
                        fields="name,email,picture,first_name,last_name"
                        callback={responseFacebook}
                    />
                    <button className="btn btn-sm btn-primary" onClick={()=>props.setwidjetFbVisibility(false)}>Close</button>
                </div>

        </div>
    )
}

export default FacebookAuth;