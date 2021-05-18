import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
} from "react-router-dom";

const CampaignContainer = (props) => {
    const history = useHistory();

    return(
        <div id={props.campaignObject['campaign_id']}
             onClick={(event) => {
                history.push(`/MainPage/campaignDetails/${props.campaignObject['campaign_id']}`);
             }}
             className={'campaignContainers'}
        >
            <h3>{props.campaignObject['campaign_name']}</h3>
            <h4>{'Theme:' + props.campaignObject['campaign_theme'] }</h4>
            <div><span>Creator:</span> <span>{props.campaignObject['campaign_creator_name']}</span></div>
            <div><span>Need money:</span> <span>{props.campaignObject['campaign_money_amount']}</span></div>
            <div>{props.campaignObject['campaign_info']}</div>
            <div>
                <span>
                    Latest update:
                </span>
                <span>
                    {(new Date(props.campaignObject['campaign_latest_update'])).toLocaleDateString()}
                </span>
                <span>
                    /
                </span>
                <span>
                    {(new Date(props.campaignObject['campaign_latest_update'])).toLocaleTimeString()}
                </span>
            </div>
        </div>
    )
}

export default CampaignContainer;