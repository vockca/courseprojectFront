import React, {useRef, useState} from "react";
import  {Formik, Form, useField} from "formik";

import {ServerAddress} from "../../serverAddress/serverAdress";
import {CreateCampaignValidation} from "./createCampaignValidation";
import ServerMsgHandler from "../serverMsgHandler/serverMsgHandler";
import Tags from "@yaireo/tagify/dist/react.tagify";
import {FileDrop} from "react-file-drop";

import './createCampaign.css';
import ImagePreview from "./imagePreview";
import {useHistory} from "react-router";


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
    const [serverMessage, setServerMessage] = useState(false);
    const [tagsArr, setTagsArr] = useState([]);

    const [imgsURL, setImgsURL] = useState([]);
    const history = useHistory();


    const showServerMessage = (msg, duration) => {
        setServerMessage(msg);
        setTimeout(() => setServerMessage(false), duration);
    }

    return(
        <div>
            {serverMessage && <ServerMsgHandler text={serverMessage}>{serverMessage}</ServerMsgHandler>}

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
                        onSubmit= { async (values, actions) => {
                            let objToSend = {
                                campaign : values,
                                user : props.userInfo,
                                imgs : imgsURL,
                            }
                            objToSend.campaign.tags = tagsArr;

                            let response = await fetch(`${ServerAddress.address}/CreateCampaign`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json;charset=utf-8'
                                },
                                body: JSON.stringify(objToSend),
                            });

                            let jsonResponse = await response.json();

                            showServerMessage(jsonResponse.msg, 2000);

                            if (jsonResponse.data) {
                                history.push('/');
                            }

                            actions.setSubmitting(false);
                            actions.resetForm();
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

                        <label htmlFor={'tags'}>Tags</label>
                        <Tags
                            settings={{
                                placeholder: 'Write some tags...',
                                delimiters: " ",
                                trim: true,
                            }}
                            name={'tags'}
                            className={'input'}
                            whitelist={[]}
                            onChange={ e => {
                                setTagsArr(JSON.parse(e.detail.value).map(item => {
                                    return item.value;
                                }));
                            } }
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

            <div style={{ border: '1px solid black', width: 600, color: 'black', padding: 20 }}>

                <FileDrop
                    onDrop={ async (files, event) => {
                        let reader = new FileReader();
                        reader.readAsDataURL(files[files.length-1]);
                        reader.onloadend = async () => {
                            let response = await fetch(`${ServerAddress.address}/images`, {
                                method: 'POST',
                                body: JSON.stringify({data: reader.result}),
                                headers: {'Content-Type': 'application/json'},
                            });

                            let jsonResponse = await response.json();

                            setImgsURL([...imgsURL, jsonResponse.url]);
                        };
                    }}
                >
                    Drop some images here!
                </FileDrop>
            </div>

            {imgsURL.length>0 && (
                <ImagePreview urlArray={imgsURL}/>
            )}
        </div>
    )
}

export default CreateCampaignForm;