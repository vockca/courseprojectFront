import React, {useEffect, useState} from "react";
import LatestCompanies from "./latestCompanies";
import TagsCloud from "./tagsCloud";
import HighRatedCompanies from "./highRatedCompanies";

import "./mainPage.css";
import {Route} from "react-router-dom";
import CampaignDetails from "./campaignDetails";
import {ServerAddress} from "../../serverAddress/serverAdress";


async function getResponse (fetch){
    let response = await fetch;
    if (response.ok) {
        let json = await response.json();
        return json;
    } else {
        console.error("Cant get JSON response");
    }
}

const MainPage = (props) => {
    const [content, setContent] = useState([]);
    console.log(`${ServerAddress.address}/campaigns`);

    useEffect(()=> { //make mainpage send the data of campaigns
        getResponse(fetch(`${ServerAddress.address}/campaigns`, {
                credentials: 'include',
                headers: {
                    'Access-Control-Allow-Origin' : `https://gracious-jennings-2eaa14.netlify.app`,
                },
            })).then((response) => {
            setContent(response.data);
        });
    }, []);

    useEffect(async () => {
        const response = await fetch(`${ServerAddress.address}/userInfo`,{
            credentials: 'include',
            headers: {
                'Access-Control-Allow-Origin' : `https://gracious-jennings-2eaa14.netlify.app`,
            }
        });

        const ResponseJSON = await response.json();
        //make a way to cover the answer if user not authorized
        if (ResponseJSON.data) {
            props.defineCurrentUser(ResponseJSON.data);
        };
    }, []);


    return(
        <div className={'mainContainer'}>

            <Route exact path={'/MainPage'}>
                <TagsCloud>tags cloud</TagsCloud>
                <LatestCompanies contentArray={content}>latest companies</LatestCompanies>
                <HighRatedCompanies contentArray={content}>high rated companies</HighRatedCompanies>
            </Route>

            <Route path={'/MainPage/campaignDetails'}>
                <CampaignDetails />
            </Route>
        </div>

    )
}

export default MainPage;