import React, {useEffect, useState} from "react";
import PersonalData from "./personalData";
import {Route, useParams} from "react-router";
import CreateCampaignForm from "../createCampaign/createCampaign";
import {Link} from "react-router-dom";
import {ServerAddress} from "../../serverAddress/serverAdress";
import PersonalDataStatic from "./personalDataStatic";
import PersonalCampaigns from "./personalCampaigns";

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
                    <div className='d-flex flex-row'>
                    <Route path={`/profile/${login}/`}>
                        <Link className='btn btn-primary btn-sm' to={`/profile/${login}/personal`}><div>Personal Data</div></Link>
                        <Link className='btn btn-primary btn-sm ml-1' to={`/profile/${login}/createCampaign`}><div>Create Campaign</div></Link>
                        <Link className='btn btn-primary btn-sm ml-1' to={`/profile/${login}/personalCampaigns`}><div>{`${login}'s Campaigns`}</div></Link>
                    </Route>
                    </div>

                    <Route path={`/profile/${login}/personal`}>
                        {isEditable ?
                            <PersonalData key={login} defineCurrentUser={props.defineCurrentUser} userInfo={userObject}/>
                            : <PersonalDataStatic key={login} userInfo={userObject}/>
                        }
                    </Route>

                    <Route path={`/profile/${login}/personalCampaigns`}>
                        <PersonalCampaigns login={login} userInfo={userObject}/>
                    </Route>

                    <Route path={`/profile/${login}/createCampaign`}>
                        <CreateCampaignForm login={login} userInfo={userObject}/>
                    </Route>
                </div> : null}
        </div>
    )
}

export default UserProfile;