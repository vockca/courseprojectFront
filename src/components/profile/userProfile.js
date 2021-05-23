import React, {useEffect, useState} from "react";
import PersonalData from "./personalData";
import {Route, useParams} from "react-router";
import CreateCampaignForm from "../createCampaign/createCampaign";
import {Link} from "react-router-dom";
import {ServerAddress} from "../../serverAddress/serverAdress";
import PersonalDataStatic from "./personalDataStatic";

const UserProfile = (props) => {
    const [userObject, setUserObject] = useState({});
    const [isDataFetched, setIsDataFetched] = useState(false);
    const [isEditable, setIseditable] = useState(false)
    let {login} = useParams();

    useEffect(async () => {
        let userToken = {
            token: localStorage.getItem('USER'),
        }
        const response = await fetch(`${ServerAddress.address}/userInfo/${login}`, {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('USER'),
            },
        });

        const ResponseJSON = await response.json();
        //make a way to cover the answer if user not authorized
        if (ResponseJSON.data) {
            setUserObject(ResponseJSON.data);
            setIseditable(ResponseJSON.isEditable);
            setIsDataFetched(true);
        }
    }, [login]);

    return(
        <div>
            {isDataFetched ?
                <div>
                    <Link to={`/profile/${login}/personal`}>Personal Data</Link>
                    <Link to={`/profile/${login}/createCampaign`}>Create Campaign</Link>

                    <Route path={`/profile/${login}/personal`}>
                        {isEditable ?
                            <PersonalData key={login} defineCurrentUser={props.defineCurrentUser} userInfo={userObject}/>
                            : <PersonalDataStatic key={login} userInfo={userObject}/>
                        }
                    </Route>
                    <Route path={`/profile/${login}/createCampaign`}>
                        <CreateCampaignForm login={login} userInfo={userObject}/>
                    </Route>
                </div> : null}
        </div>
    )
}

export default UserProfile;