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
                <form className='d-flex flex-column align-items-start mt-3'>
                    <div className={'profileContainers form-input-group'}>
                        <div className="form-label">Login: </div> <div className="form-input form-control">{userObject['user_login']}</div>
                    </div>

                    <div className={'profileContainers form-input-group'}>
                        <div className="form-label">Name: </div> <div className="form-input form-control">{userObject['user_firstname']}</div>
                    </div>

                    <div className={'profileContainers form-input-group'}>
                        <div className="form-label">Surname: </div> <div className="form-input form-control">{userObject['user_lastname']}</div>
                    </div>

                    <div className={'profileContainers form-input-group'}>
                        <div className="form-label">Email: </div> <div className="form-input form-control">{userObject['user_email']}</div>
                    </div>
                    {/*//bonuses tba*/}
                </form> : null}
        </div>
    )
}

export default PersonalDataStatic;