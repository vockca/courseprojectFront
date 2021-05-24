import React, {useEffect, useState} from 'react';
import CreateCampaignNews from "./news/createCampaignNews";
import CampaignNews from "./news/campaignNews";
import {Route} from "react-router";
import {Link} from "react-router-dom";
import {ServerAddress} from "../../serverAddress/serverAdress";
import NewsContainer from "./news/newsContainer";

const CampaignFeed = (props) => {
    const [newsDataArr, setNewsDataArr] = useState([]);

    const getCampaignNews = () => {
            fetch(`${ServerAddress.address}/${props.campaignInfo['campaign_id']}/campaignNews`)
            .then(result => {
                return result.json();
            })
            .then(resultJSON => {
                setNewsDataArr(resultJSON.data);
            });

        return setTimeout(() => getCampaignNews(), 5000);
    }

    useEffect( () => {
       let idTimeout =  getCampaignNews();

       return () => {
           clearTimeout(idTimeout);
       }
    },[]);

    return(
        <div className='mt-4'>
            <Link className='btn btn-sm btn-primary' to={`/MainPage/campaignDetails/${props.campaignInfo['campaign_id']}/createCampaignNews`}><div>Add news</div></Link>
            <Route path={`/MainPage/campaignDetails/${props.campaignInfo['campaign_id']}/createCampaignNews`}>
                <CreateCampaignNews history={props.history} campaignInfo={props.campaignInfo}/>
            </Route>
            <CampaignNews newsArray = {newsDataArr} campaignInfo={props.campaignInfo}/>
        </div>
    )
}

export default CampaignFeed;