import React, {useState} from "react";
import CampaignContainer from "./compaignContainer";

const sortingByDate = (a, b) => {
    return  b['campaign_latest_update'] - a['campaign_latest_update'];
}

const LatestCompanies = (props) => {

    const sortedArray = props.contentArray.sort(sortingByDate);
    const companiesArray = sortedArray.map((item) => {
        return <CampaignContainer setActiveCampaign={props.setActiveCampaign} key={item['campaign_id']}  campaignObject={item}/>
    })

    return(
        <div className='latestCompaniesContainer d-flex flex-column'>
            <h3 className='latestCompaniesContainerHeader mb-3'>Recently updated campaigns</h3>
            <div className='compaignsContentContainer'>
                {companiesArray}
            </div>
        </div>
    )
}

export default LatestCompanies;