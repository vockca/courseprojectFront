import React, {useEffect, useState} from "react";
import {ServerAddress} from "../../serverAddress/serverAdress";
import EditableInputComponent from "./editableComponent";

import './profile.css';


const PersonalData = (props) => {
    const [userObject, setUserObject] = useState(null);

    useEffect(async () => {
        setUserObject(props.userInfo);
    }, []);

    const sendUpdatedUser = async (userObj) => {
        const response = await fetch(`${ServerAddress.address}/userInfo`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(userObj),
        },);
        const responseJSON = await response.json()
        if (await responseJSON) {
            props.defineCurrentUser(userObj);
            localStorage.setItem('USER', responseJSON.data)
            console.log('user info updated');
        } else {
            console.log('error cant update user info')
        }
    }


    return (
        <div>
            {userObject ?
                <form>
                    <EditableInputComponent
                        text={userObject['user_login']}
                        label={'Login'}
                        inputClassName={'profileInputs'}
                        labelClassName={'profileLabels'}
                        containerClassName={'profileContainers'}
                        onFocusOut={(login) => {
                            userObject['user_login'] = login;
                            sendUpdatedUser(userObject);
                        }}
                    />

                    <EditableInputComponent
                        text={userObject['user_firstname']}
                        label={'Name'}
                        inputClassName={'profileInputs'}
                        labelClassName={'profileLabels'}
                        containerClassName={'profileContainers'}
                        onFocusOut={(firstname) => {
                            userObject['user_firstname'] = firstname;
                            sendUpdatedUser(userObject);
                        }}
                    />

                    <EditableInputComponent
                        text={userObject['user_lastname']}
                        label={'Surname'}
                        inputClassName={'profileInputs'}
                        labelClassName={'profileLabels'}
                        containerClassName={'profileContainers'}
                        onFocusOut={(lastname) => {
                            userObject['user_lastname'] = lastname;
                            sendUpdatedUser(userObject);
                        }}
                    />

                    <EditableInputComponent
                        text={userObject['user_email']}
                        label={'Email'}
                        inputClassName={'profileInputs'}
                        labelClassName={'profileLabels'}
                        containerClassName={'profileContainers'}
                        onFocusOut={(email) => {
                            userObject['user_email'] = email;
                            sendUpdatedUser(userObject);
                        }}
                    />
                    {/*//bonuses tba*/}
                </form> : null}
        </div>
    )
}

export default PersonalData;