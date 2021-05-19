import React, {useState} from "react";
import VK, {Auth} from "react-vk";
import {ServerAddress} from "../../serverAddress/serverAdress";

const VkAuth = (props) => {
    const [widjetVisibility, setwidjetVisibility] = useState(false)

    return(
        <div>
            <button onClick={()=>setwidjetVisibility(true)}>Log in with VK</button>

            {widjetVisibility ?
            <div>
                <VK apiId={7853156} onApiAvailable={() => console.log('vk widjet loaded')}>
                    <Auth options={
                        {
                            onAuth : async (user) => {
                                let values = {
                                    login: user.uid,
                                    password: user.hash,
                                };
                                let response = await fetch(`${ServerAddress.address}/LogIn`, {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json;charset=utf-8',
                                    },
                                    body: JSON.stringify(values),
                                });

                                let jsonResponse = await response.json();
                                localStorage.setItem('USER', jsonResponse.data);
                                console.log(jsonResponse.msg);
                                props.showServerMessage(jsonResponse.msg, 2000);
                            },
                        width: "400",
                        height: "50",
                        }
                    }
                    />
                </VK>
                <button onClick={()=>setwidjetVisibility(false)}>Close</button>
            </div> : null}

        </div>
    )
}

export default VkAuth;