import React from "react";
import Tags from "@yaireo/tagify/dist/react.tagify";
import {useHistory} from "react-router-dom";

const CampaignContainer = (props) => {
    const history = useHistory();

    return(
        <div id={props.campaignObject['campaign_id']}
             onClick={(event) => {
                history.push(`/MainPage/campaignDetails/${props.campaignObject['campaign_id']}`);
             }}
             className={'campaignContainers'}
        >
            <h3 className='text-capitalize font-lg mb-2'>{props.campaignObject['campaign_name']}</h3>
            <h4 className='text-capitalize font-md mb-0'>
                <span className='font-weight-normal font-md'>Theme: </span>
                {props.campaignObject['campaign_theme']}
            </h4>
            <div className='font-md mb-3'>
                <span>Needed money: </span>
                <span className='font-italic'>{props.campaignObject['campaign_money_amount']}</span>
            </div>
            <div className='font-md mb-2'>{props.campaignObject['campaign_info']}</div>
            <div className='font-sm font-italic'>
                <span>Latest update: </span>
                <span>{(new Date(props.campaignObject['campaign_latest_update'])).toLocaleDateString()} </span>
                <span> {(new Date(props.campaignObject['campaign_latest_update'])).toLocaleTimeString()}</span>
            </div>

            <Tags
                value={props.campaignObject['campaign_tags']}
                name={'tags'}
                readOnly={true}
                className='tagsShowers mt-3 ml-0'
            />
        </div>
    )
}

export default CampaignContainer;