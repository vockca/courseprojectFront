import React, {useEffect, useState} from "react";
import YouTube from "react-youtube";
import getVideoId from 'get-video-id';
import Tags from "@yaireo/tagify/dist/react.tagify";
import {useHistory, useLocation} from "react-router-dom";
import {ServerAddress} from "../../serverAddress/serverAdress";
import CampaignGallery from "./campaignGallery";
import CampaignFeed from "./campaignFeed";

import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

const CampaignDetails = (props) => {
    const location = useLocation();
    const history = useHistory()
    const [value, setValue] = React.useState(2);

    const [activeCampaign, setActiveCampaign] = useState(null);

    useEffect(async () => {
        let response = await fetch(`${ServerAddress.address}${location.pathname}`);
        let responseJSON = await response.json();

        responseJSON.data.videoId = getVideoId(await responseJSON.data['campaign_video']);

        setActiveCampaign(responseJSON.data);
    }, []);


    const opts = {
        height: '390',
        width: '640',
        playerVars: {
            autoplay: 0,
        },
    }

    return(
        <div>
            {activeCampaign ?
            <div>
                <div className='d-flex flex-column align-items-start'>
                    <h3 className='text-capitalize font-xl mb-0'>{activeCampaign['campaign_name']}</h3>
                    <Box className='pt-3' component="fieldset" mb={3} borderColor="transparent">
                        <Rating
                            name="simple-controlled"
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                        />
                    </Box>
                    <h4 className='text-capitalize font-lg mb-3'>{'Theme: ' + activeCampaign['campaign_theme'] }</h4>
                </div>
                <YouTube videoId={activeCampaign.videoId.id} opts={opts} />

                <div>
                    <span>Creator: </span>
                    <span className='font-weight-bold'>{activeCampaign['user']['user_login']}</span>
                </div>

                <div>
                    <span>Needed money: </span>
                    <span>{activeCampaign['campaign_money_amount']}</span>
                </div>

                <form className='d-flex flex-column align-items-start mt-3'>
                    <label>Donate Money:</label>
                    <input className='form-control' placeholder={'Insert amount of money'}/>
                    <button className='btn btn-sm btn-primary' type={'button'} onClick={(e) => {
                        e.preventDefault();
                        alert('Successfully donated to the campaign');
                    }}>Pay</button>
                </form>

                <div>
                    <h4 className='text-capitalize font-lg mb-0 mt-4'>Information: </h4>
                    {activeCampaign['campaign_info']}
                </div>

                <div className='font-italic mt-2 mb-2'>
                    <span>Latest update: </span>
                    <span>{(new Date(activeCampaign['campaign_latest_update'])).toLocaleDateString()} </span>
                    <span>{(new Date(activeCampaign['campaign_latest_update'])).toLocaleTimeString()}</span>
                </div>

                <div>
                    <label className='font-lg'>Campaign gallery: </label>
                    {activeCampaign['campaign_pictures'] && <CampaignGallery urlArray={activeCampaign['campaign_pictures']}/>}
                </div>


                <div className='mt-3 mb-1'>
                    <Tags
                        value={activeCampaign['campaign_tags']}
                        name={'tags'}
                        readOnly={true}
                        className={'tagsShowers'}
                    />
                </div>

                <CampaignFeed history={history} campaignInfo={activeCampaign}/>

            </div> : null}
        </div>
    )
}

export default CampaignDetails;