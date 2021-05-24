import React, {useState} from 'react';
import {Form, Formik, useField} from "formik";
import ImagePreview from "../../createCampaign/imagePreview";
import {ServerAddress} from "../../../serverAddress/serverAdress";
import {FileDrop} from "react-file-drop";


const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);

    return (
        <div className='form-input-group'>
            <label className="form-label" htmlFor={props.id || props.name}>{label}</label>
            <input className="form-input form-control" {...field} {...props} required/>
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </div>
    );
};


const MyTextAreaInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);

    return (
        <div className='form-input-group'>
            <label className="form-label"  htmlFor={props.id || props.name}>{label}</label>
            <textarea className="form-input form-control" {...field} {...props} required/>
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </div>
    );
};

const CreateCampaignNews = (props) => {
    const [imgURL, setImgURL] = useState([]);

    return(
        <div>
            <div className={"formContainers"}>
                <h2>Add news</h2>
                <Formik initialValues={{
                    newsHeader: "",
                    newsText: "",
                }}

                        onSubmit= { async (values, actions) => {
                            let objToSend = {
                                news : values,
                                campaign : props.campaignInfo,
                                img : imgURL,
                            }


                            console.log(objToSend);
                            let response = await fetch(`${ServerAddress.address}/CreateCampaignNews`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json;charset=utf-8',
                                    'Authorization': localStorage.getItem('USER'),
                                },
                                body: JSON.stringify(objToSend),
                            });
                            let jsonResponse = await response.json();


                            if (jsonResponse.data) {
                                props.history.push(`/MainPage/campaignDetails/${props.campaignInfo['campaign_id']}`);
                            }

                            console.log(jsonResponse);

                            actions.setSubmitting(false);
                            actions.resetForm();
                        }}
                >

                    <Form>
                        <MyTextInput
                            label="News header:"
                            name="newsHeader"
                            type="text"
                            placeholder=""
                        />

                        <MyTextAreaInput
                            label="News Text"
                            name="newsText"
                            type="textarea"
                            placeholder=""
                        />

                        <div className='form-input-group'>
                            <label className='form-label'>
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

                                        setImgURL(jsonResponse.url);
                                    };
                                }}
                            >
                                Drop some images here!
                            </FileDrop>
                            </label>
                        </div>

                        <button className='btn btn-sm btn-primary' type={'Submit'}>Create</button>
                    </Form>
                </Formik>
            </div>

            <ImagePreview urlArray={[imgURL]}/>
    </div>
    )
}

export default CreateCampaignNews;