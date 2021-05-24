import React, {useState} from "react";
import CampaignContainer from "./compaignContainer";

const sortingByDate = (a, b) => {
    return  b['campaign_rating'] - a['campaign_rating'];
}

const HighRatedCompanies = (props) => {

    const sortedArray = props.contentArray.sort(sortingByDate);
    const companiesArray = sortedArray.map((item) => {
        return <CampaignContainer setActiveCampaign={props.setActiveCampaign} key={item['campaign_id']}  campaignObject={item}/>
    })

    return(
        <div className={'highRatedCompaniesContainer'}>
            <h3 className={'highRatedCompaniesContainerHeader mb-3'}>The most rated campaigns</h3>
            <div className='compaignsContentContainer'>
                {companiesArray}
            </div>
        </div>
    )
}


export default HighRatedCompanies;