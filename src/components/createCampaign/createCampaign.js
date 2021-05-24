import React, {useEffect, useRef, useState} from "react";
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
        <div className='form-input-group'>
            <label className="form-label" htmlFor={props.id || props.name}>{label}</label>
            <input className="form-input form-control" {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </div>
    );
};


const MySelect = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div className='form-input-group'>
            <label className="form-label" htmlFor={props.id || props.name}>{label}</label>
            <select className="form-input form-control"  {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </div>
    );
};

const MyTextAreaInput = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input>. We can use field meta to show an error
    // message if the field is invalid and it has been touched (i.e. visited)
    const [field, meta] = useField(props);
    return (
        <div className='form-input-group'>
            <label className="form-label" htmlFor={props.id || props.name}>{label}</label>
            <textarea className="form-input form-control" {...field} {...props} />
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
    const [tagsWhiteList, setTagsWhiteList] = useState([]);
    const history = useHistory();

    useEffect(async () => {
        const response = await fetch(`${ServerAddress.address}/tags`);
        const tags = await response.json();

        setTagsWhiteList(tags.data.map(item => {
            return item['campaign_tags'];
        }));
    }, []);

    const showServerMessage = (msg, duration) => {
        setServerMessage(msg);
        setTimeout(() => setServerMessage(false), duration);
    }

    return(
        <div>
            {serverMessage && <ServerMsgHandler text={serverMessage}>{serverMessage}</ServerMsgHandler>}

            <div className={"formContainers"}>
                <h1 className='font-xl mt-4'>Create Campaign</h1>
                <Formik initialValues={{
                    campaignName: "",
                    bonuses: "",
                    campaignTheme: "",
                    campaignVideo: "",
                    moneyAmount: "",
                    campaignInfo: "",
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

                        <div className='form-input-group'>
                            <label className="form-label" htmlFor={'tags'}>Tags</label>
                            <Tags
                                settings={{
                                    placeholder: 'Write some tags',
                                    delimiters: " ",
                                    trim: true,
                                }}
                                name={'tags'}
                                className="form-input"
                                whitelist={tagsWhiteList}
                                onChange={ e => {
                                    setTagsArr(JSON.parse(e.detail.value).map(item => {
                                        return item.value;
                                    }));
                                } }
                            />
                        </div>

                        <MyTextAreaInput
                            label="Campaign Info:"
                            name="campaignInfo"
                            type="textarea"
                            placeholder=""
                        />

                        <div className='form-input-group'>
                            <label className='form-label'>Images</label>
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

                        <div className='mt-3'>
                            <button className='btn btn-sm btn-primary' type={'Submit'}>Create</button>
                        </div>
                    </Form>
                </Formik>
            </div>

            {imgsURL.length>0 && (
                <ImagePreview urlArray={imgsURL}/>
            )}
        </div>
    )
}

export default CreateCampaignForm;