import React, {useState} from "react";
import VK, {Auth} from "react-vk";
import {ServerAddress} from "../../serverAddress/serverAdress";

const VkRegistration = (props) => {
    return(
            <div className='d-flex flex-row align-items-center'>
                <VK apiId={7853156} onApiAvailable={() => console.log('vk widjet loaded')}>
                    <Auth options={
                        {
                            onAuth : async (user) => {
                                console.log(user);
                                    let values = {
                                        login: user.uid,
                                        firstName: user.first_name,
                                        lastName: user.last_name,
                                        password: user.hash,
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

                                    if (jsonResponse.data) {
                                        props.redirectToLogIn();
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
                <button className="btn btn-sm btn-secondary ml-2"  onClick={()=>props.setVkWidjetVisibility(false)}>Close</button>
            </div>
    )
}

export default VkRegistration;