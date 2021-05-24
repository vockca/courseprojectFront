import React from 'react';
import Commentaries from "../commentaries/commentaries";
import {ServerAddress} from "../../../serverAddress/serverAdress";

const NewsContainer = (props) => {
    const isCreator = localStorage.getItem('LOGIN') === props.news['news_creator_login'] ||
        localStorage.getItem('LOGIN') === 'admin';

    return(
        <div>
            <h3>{props.news['news_header']}</h3>
            <img src={props.news['news_img']} alt={'news image'}/>
            <div className={'news-text'}>{props.news['news_text']}</div>
            <div className={'news-date'}>
                 <span>
                    {(new Date(props.news['news_date'])).toLocaleDateString()}
                </span>
                <span>
                    /
                </span>
                <span>
                    {(new Date(props.news['news_date'])).toLocaleTimeString()}
                </span>
            </div>

            {isCreator && <button className="btn btn-outline-danger" onClick={async () => {
                const response = await fetch(`${ServerAddress.address}/campaignNews/${props.news['news_id']}`,
                    {
                        method: 'DELETE',
                        headers: {
                            'Authorization': localStorage.getItem('USER'),
                        },
                    },
                );
                const jsonResponse = await response.json();
                console.log(jsonResponse.msg);
            }}>Delete news</button>}

            <h3>Comment down below:</h3>
            <Commentaries newsInfo={props.news} />
        </div>
    )
}

export default NewsContainer;