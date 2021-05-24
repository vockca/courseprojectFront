import React, {useEffect, useState} from "react";
import LatestCompanies from "./latestCompanies";
import TagsCloud from "./tagsCloud";
import HighRatedCompanies from "./highRatedCompanies";

import "./mainPage.css";
import {Route} from "react-router-dom";
import CampaignDetails from "../campaignDetails/campaignDetails";
import {ServerAddress} from "../../serverAddress/serverAdress";

//check if it useful to use this kind of functions instead of just raw fetching
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
    const [selectedTags, setSelectedTags] = useState([]);
    const [shownContent, setShownContent] = useState(content);

    useEffect(()=> { //make mainpage send the data of campaigns
        getResponse(fetch(`${ServerAddress.address}/campaigns`)).then((response) => {
            setContent(response.data);
            setShownContent(response.data);
        });
    }, []);

    useEffect(()=> { //make mainpage send the data of campaigns
        sortingByTags(selectedTags);
    }, [selectedTags]);

    const toggleTag = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter((item, index) => {
                return selectedTags.indexOf(tag) !== index;
            }));
            return;
        }
        setSelectedTags([...selectedTags, tag]);
    }

    const clearTags = () => {
        console.log(1);
        setSelectedTags([]);
        console.log(selectedTags);
    }

    const sortingByTags = (tags) => {
        if (tags.length === 0) {
            setShownContent(content);
            return;
        }

        setShownContent(content.filter((item) => {
            let isContain = false;
            item['campaign_tags'].split(',').forEach(item => {
                if(tags.includes(item)) {
                    isContain = true;
                }
            })
            console.log(tags);
            return isContain;
        }))
        console.log(tags);
    }


    return(
        <div className={'mainContainer'}>

            <Route exact path={'/MainPage'}>
                <TagsCloud toggleTag={toggleTag} clearTags={clearTags} />
                <div className='d-flex justify-content-between mt-3'>
                    <LatestCompanies contentArray={shownContent}>latest companies</LatestCompanies>
                    <HighRatedCompanies contentArray={shownContent}>high rated companies</HighRatedCompanies>
                </div>
            </Route>

            <Route path={'/MainPage/campaignDetails'}>
                <CampaignDetails />
            </Route>

        </div>

    )
}

export default MainPage;