import React, {useState} from "react";
import FacebookLogin from 'react-facebook-login';
import {ServerAddress} from "../../serverAddress/serverAdress";



const FbRegistration = (props) => {
    const [widjetVisibility, setwidjetVisibility] = useState(false);

    const responseFacebook = async (user) => {
        console.log(user);
        let values = {
            login: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            password: user.id,
            email: user.email,
        };
        let response = await fetch(`${ServerAddress.address}/SignUp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(values),
        });

        let jsonResponse = await response.json();
        console.log(jsonResponse.msg);
        props.showServerMessage(jsonResponse.msg, 2000);
    }

    return(
        <div>
            <button onClick={()=>setwidjetVisibility(true)}>Sign up with Facebook</button>

            {widjetVisibility ?
                <div>
                    <FacebookLogin
                        appId="942739773232091"
                        autoLoad={true}
                        fields="name,email,picture,first_name,last_name"
                        callback={responseFacebook}
                    />
                    <button onClick={()=>setwidjetVisibility(false)}>Close</button>
                </div> : null}

        </div>
    )
}

export default FbRegistration;