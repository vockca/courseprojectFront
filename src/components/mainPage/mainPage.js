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

    useEffect(()=> { //make mainpage send the data of campaigns
        getResponse(fetch(`${ServerAddress.address}/campaigns`)).then((response) => {
            setContent(response.data);
        });
    }, []);

    useEffect(async () => {
        let userToken = {
            token: localStorage.getItem('USER'),
        }
        const response = await fetch(`${ServerAddress.address}/userInfo`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(userToken),
        },);

        const ResponseJSON = await response.json();
        //make a way to cover the answer if user not authorized
        if (ResponseJSON.data) {
            props.defineCurrentUser(ResponseJSON.data);
        }
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