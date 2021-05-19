import React, {useEffect, useState} from "react";
import YouTube from "react-youtube";
import getVideoId from 'get-video-id';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
} from "react-router-dom";

const CampaignDetails = (props) => {
    const location = useLocation();
    let videoId;

    const [activeCampaign, setActiveCampaign] = useState(null);

    useEffect(async () => {
        let response = await fetch(`http://localhost:3000${location.pathname}`);
        let responseJSON = await response.json();
        responseJSON.data.videoId = getVideoId(await responseJSON.data['campaign_video']);
        setActiveCampaign(await responseJSON.data);
    }, []);


    const opts = {
        height: '390',
        width: '640',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    }

    return(
        <div>
            {activeCampaign ?
            <div>
                <h3>{activeCampaign['campaign_name']}</h3>
                <h4>{'Theme:' + activeCampaign['campaign_theme'] }</h4>
                <YouTube videoId={activeCampaign.videoId.id} opts={opts} onReady={()=>{console.log('video is ready')}} />
                <div><span>Creator:</span> <span>{activeCampaign['campaign_creator_name']}</span></div>
                <div><span>Need money:</span> <span>{activeCampaign['campaign_money_amount']}</span></div>
                <div>{activeCampaign['campaign_info']}</div>
                <div>
                    <span>
                        Latest update:
                    </span>
                    <span>
                        {(new Date(activeCampaign['campaign_latest_update'])).toLocaleDateString()}
                    </span>
                    <span>
                        /
                    </span>
                    <span>
                        {(new Date(activeCampaign['campaign_latest_update'])).toLocaleTimeString()}
                    </span>
                </div>
            </div> : null}
        </div>
    )
}

export default CampaignDetails;