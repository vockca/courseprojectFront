import React, {useEffect, useState} from "react";
import YouTube from "react-youtube";
import getVideoId from 'get-video-id';
import Tags from "@yaireo/tagify/dist/react.tagify";
import {useLocation} from "react-router-dom";
import {ServerAddress} from "../../serverAddress/serverAdress";
import CampaignGallery from "./campaignGallery";

const CampaignDetails = (props) => {
    const location = useLocation();

    const [activeCampaign, setActiveCampaign] = useState(null);

    useEffect(async () => {
        let response = await fetch(`${ServerAddress.address}${location.pathname}`);
        let responseJSON = await response.json();

        responseJSON.data.videoId = getVideoId(await responseJSON.data['campaign_video']);

        setActiveCampaign(await responseJSON.data);
    }, []);


    const opts = {
        height: '390',
        width: '640',
        playerVars: {
            autoplay: 0,
        },
    }
    console.log(activeCampaign);

    return(
        <div>
            {activeCampaign ?
            <div>
                <h3>{activeCampaign['campaign_name']}</h3>
                <h4>{'Theme:' + activeCampaign['campaign_theme'] }</h4>
                <YouTube videoId={activeCampaign.videoId.id} opts={opts} onReady={()=>{console.log('video is ready')}} />
                <div><span>Creator:</span> <span>{activeCampaign['user']['user_login']}</span></div>
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

                {activeCampaign['campaign_pictures'] && <CampaignGallery urlArray={activeCampaign['campaign_pictures']}/>}

                <Tags
                    settings={{
                    }}
                    value={activeCampaign['campaign_tags']}
                    name={'tags'}
                    readOnly={true}
                    className={'tagsShowers'}
                    onChange={ e => {
                        console.log("CHANGED:", JSON.parse(e.detail.value));
                    } }
                />

            </div> : null}
        </div>
    )
}

export default CampaignDetails;