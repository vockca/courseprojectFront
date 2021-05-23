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
                           inputWidth='200px'
                           inputHeight='25px'
                           inputMaxLength={50}
                           labelFontWeight='bold'
                           inputFontWeight='bold'
                           onFocus={props.onFocus}
                           onFocusOut={props.onFocusOut}
            />
        </div>
    )
}

export default EditableInputComponent;