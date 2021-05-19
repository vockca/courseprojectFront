import React, {useState} from "react";
import VK, {Auth} from "react-vk";
import {ServerAddress} from "../../serverAddress/serverAdress";

const VkRegistration = (props) => {
    const [widjetVisibility, setwidjetVisibility] = useState(false)

    return(
        <div>
            <button onClick={()=>setwidjetVisibility(true)}>Sign up with VK</button>

            {widjetVisibility ?
                <div>
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

export default VkRegistration;