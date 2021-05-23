import React, {useEffect, useState} from "react";
import {ServerAddress} from "../../serverAddress/serverAdress";
import { TagCloud } from 'react-tagcloud'


const TagsCloud = (props) => {
    const [tags, setTags] = useState(null);
    const [isDataFetched, setIsDataFetched] = useState(false);

    const getTags = async () => {
        const response = await fetch(`${ServerAddress.address}/tags`, {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('USER'),
            },
        });

        const ResponseJSON = await response.json();
        //make a way to cover the answer if user not authorized
        if (ResponseJSON.data) {
            let flatTagsArray = ResponseJSON.data.map((item, index) => {
                return item['campaign_tags'].split(',');
            }).flat();


            setTags(flatTagsArray.map((item,index) => {
                return {value: item, count: index}
            }));

            setIsDataFetched(true);
        }
    }

    useEffect(() => {
        getTags();
    }, []);

    return(
        <div>
            {isDataFetched ?
                <div>
                    <TagCloud
                    minSize={12}
                    maxSize={35}
                    tags={tags}
                    onClick={tag => {
                        props.toggleTag(tag.value);
                    }}
                    />
                    <button onClick={() => props.clearTags()}>Clear all Selected Tags</button>
            </div> : null}
        </div>
    )
}

export default TagsCloud;