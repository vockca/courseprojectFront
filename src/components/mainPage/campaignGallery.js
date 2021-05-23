import React from 'react'

const CampaignGallery = (props) => {

    const content = props.urlArray.split(",").map((item, index) => {
        return (
            <img key ={index} src={item} alt={"img number" + index}/>
        )
    })


    return(
        <div className={'campaignGallery'}>
            {content}
        </div>
    )
}

export default CampaignGallery;
