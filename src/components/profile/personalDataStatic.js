import React, {useEffect, useState} from "react";
import {ServerAddress} from "../../serverAddress/serverAdress";
import EditableInputComponent from "./editableComponent";

import './profile.css';


const PersonalDataStatic = (props) => {
    const [userObject, setUserObject] = useState(null);

    useEffect(async () => {
        setUserObject(props.userInfo);
    }, []);


    return (
        <div>
            {userObject ?
                <form>
                    <div className={'profileContainers'}>
                        <span>Login: </span> <span>{userObject['user_login']}</span>
                    </div>

                    <div className={'profileContainers'}>
                        <span>Name: </span> <span>{userObject['user_firstname']}</span>
                    </div>

                    <div className={'profileContainers'}>
                        <span>Surname: </span> <span>{userObject['user_lastname']}</span>
                    </div>

                    <div className={'profileContainers'}>
                        <span>Email: </span> <span>{userObject['user_email']}</span>
                    </div>
                    {/*//bonuses tba*/}
                </form> : null}
        </div>
    )
}

export default PersonalDataStatic;