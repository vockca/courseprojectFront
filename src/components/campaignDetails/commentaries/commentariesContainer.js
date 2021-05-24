import React, {useEffect, useState} from 'react';
import {ServerAddress} from "../../../serverAddress/serverAdress";

const CommentaryContainer = (props) => {

    return(
        <div>
            <h3>{props.commentary['user_login']}</h3>
            <div className={'news-text'}>{props.commentary['commentaries_text']}</div>
            <div className={'news-date'}>
                 <span>
                    {(new Date(props.commentary['commentaries_date'])).toLocaleDateString()}
                </span>
                <span>
                    /
                </span>
                <span>
                    {(new Date(props.commentary['commentaries_date'])).toLocaleTimeString()}
                </span>
            </div>
        </div>
    )
}

export default CommentaryContainer;