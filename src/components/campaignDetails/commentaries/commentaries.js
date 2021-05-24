import React, {useEffect, useState} from 'react';
import {ServerAddress} from "../../../serverAddress/serverAdress";
import CommentaryContainer from "./commentariesContainer";
import CreateCommentary from "./createCommentary";

const sortingByDate = (a, b) => {
    return  a['commentaries_date'] - b['commentaries_date'];
}

const Commentaries = (props) => {
    const [commentaries, setCommentaries] = useState([])

    const getCommentaries = () => {
        fetch(`${ServerAddress.address}/${props.newsInfo['news_id']}/commentaries`)
            .then(result => {
                return result.json();
            })
            .then(resultJSON => {
                setCommentaries(resultJSON.data);
            });

        return setTimeout(() => getCommentaries(), 5000);
    }


    useEffect( () => {
        let idTimeout =  getCommentaries();

        return () => {
            clearTimeout(idTimeout);
        }
    },[]);

    const commentariesArr = commentaries.sort(sortingByDate).map(item => {
        return <CommentaryContainer commentary={item} key={item['commentaries_id']}/>
    })

    return(
        <div>
            <div>{commentariesArr}</div>
            <CreateCommentary campaignInfo={props.campaignInfo} newsInfo={props.newsInfo}/>
        </div>
    )
}

export default Commentaries;