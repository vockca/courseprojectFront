import React, {useState} from "react";
import EditableLabel from "react-inline-editing";

const EditableInputComponent = (props) => {

    return(
        <div className={props.containerClassName}>
            <div className={props.labelClassName}>{props.label + ': '}</div>
            <EditableLabel text={props.text}
                           className={props.inputClassName}
                           labelClassName={props.inputClassName}
                           inputClassName={props.inputClassName}
                           inputMaxLength={50}
                           onFocus={props.onFocus}
                           onFocusOut={props.onFocusOut}
            />
        </div>
    )
}

export default EditableInputComponent;