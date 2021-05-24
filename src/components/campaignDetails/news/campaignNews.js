import React, {useEffect, useState} from 'react';
import {ServerAddress} from "../../../serverAddress/serverAdress";
import NewsContainer from "./newsContainer";

const sortingByDate = (a, b) => {
    return  b['news_date'] - a['news_date'];
}

const CampaignNews = (props) => {

    const newsArr = props.newsArray.sort(sortingByDate).map(item => {
        return <NewsContainer news={item} key={item['news_id']}/>
    })

    return(
        <div>
            {newsArr}
        </div>
    )
}

export default CampaignNews;