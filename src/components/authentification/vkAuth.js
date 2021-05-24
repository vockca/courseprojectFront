import React, {useState} from "react";
import VK, {Auth} from "react-vk";
import {ServerAddress} from "../../serverAddress/serverAdress";

const VkAuth = (props) => {


    return(
        <div>
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
                                if(jsonResponse.data) {
                                    localStorage.setItem('USER', jsonResponse.token);
                                    localStorage.setItem('LOGIN', user.uid);
                                    props.defineCurrentUser(jsonResponse.data);
                                    props.redirectToMainPage()
                                }
                                console.log(jsonResponse.msg);
                                props.showServerMessage(jsonResponse.msg, 2000);
                            },
                        width: "400",
                        height: "50",
                        }
                    }
                    />
                </VK>
                <button className="btn btn-sm btn-primary" onClick={()=>props.setwidjetVkVisibility(false)}>Close</button>
            </div>
        </div>
    )
}

export default VkAuth;