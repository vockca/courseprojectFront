import React from "react";


const ServerMsgHandler = (props) => {
    return(
        <div className={'serverMessage'}>{props.children}</div>
    )
}

export default ServerMsgHandler;
