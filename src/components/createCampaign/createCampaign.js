import React, {useState} from "react";
import  {Formik, Form, useField} from "formik";

import {CreateCampaignValidation} from "./createCampaignValid";
import ServerMsgHandler from "../serverMsgHandler/serverMsgHandler";
import {ServerAddress} from "../../serverAddress/serverAdress";

const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);

    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <input className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    );
};

const MySelect = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div>
            <label htmlFor={props.id || props.name}>{label}</label>
            <select {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </div>
    );
};

const CreateCampaignForm = (props) => {
    const [serverMessage, setServerMessage] = useState(false)

    const showServerMessage = (msg, duration) => {
        setServerMessage(msg);
        setTimeout(() => setServerMessage(false), duration);
    }

    return(
        <div>
            <div className={"formContainers"}>
                <h1>Create Campaign</h1>
                <Formik initialValues={{
                    campaignName: "",
                    bonuses: "",
                    campaignTheme: "",
                    campaignVideo: "",
                    moneyAmount: "",
                    campaignInfo: "",
                    campaignPictures: "",
                    tags: "",
                }}
                        validationSchema={CreateCampaignValidation.validationScheme}
                        onSubmit={async (values, actions) => {

                            let response = await fetch(`${ServerAddress.address}/CreateCampaign`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json;charset=utf-8'
                                },
                                body: JSON.stringify(values),
                            });
                            console.log(JSON.stringify(values));
                            // let jsonResponse = await response.json();
                            // console.log(jsonResponse.msg);
                            //
                            // showServerMessage(jsonResponse.msg, 2000);
                            //
                            // actions.setSubmitting(false);
                            //actions.resetForm();
                        }}

                >
                    <Form>
                        <MyTextInput
                            label="Campaign name:"
                            name="campaignName"
                            type="text"
                            placeholder=""
                        />

                        <MyTextInput
                            label="Bonuses:"
                            name="bonuses"
                            type="text"
                            placeholder=""
                        />

                        <MySelect label="Theme" name="campaignTheme">
                            <option value="">Select theme</option>
                            <option value="electronics">Electronics</option>
                            <option value="education">Education</option>
                            <option value="beauty">Beauty</option>
                            <option value="sport">Sport</option>
                            <option value="other">Other</option>
                        </MySelect>


                        <MyTextInput
                            label="Link to the youtube video:"
                            name="campaignVideo"
                            type="text"
                            placeholder=""
                        />

                        <MyTextInput
                            label="Money goal:"
                            name="moneyAmount"
                            type="text"
                            placeholder=""
                        />

                        <MyTextInput
                            label="campaignPictures:"
                            name="campaignPictures"
                            type="text"
                            placeholder=""
                        />

                        <MyTextInput
                            label="Tags:"
                            name="tags"
                            type="text"
                            placeholder=""
                        />

                        <MyTextInput
                            label="Campaign Info:"
                            name="campaignInfo"
                            type="textarea"
                            placeholder=""
                        />

                        <button type={'Submit'}>Create</button>
                    </Form>
                </Formik>
            </div>
            {serverMessage ? <ServerMsgHandler text={serverMessage}>{serverMessage}</ServerMsgHandler> : null}
        </div>
    )
}

export default CreateCampaignForm;