import React from 'react'

const ImagePreview = (props) => {

    const content = props.urlArray.map((item, index) => {
        return (
            <img key ={index} src={item} alt={"img number" + index}/>
            )
    })


    return(
        <div className={'imagePreviews'}>
            {content.length && content}
        </div>
    )
}

export default ImagePreview;
