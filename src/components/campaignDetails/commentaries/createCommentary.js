import React, {useState} from 'react';
import {Form, Formik, useField} from "formik";
import {ServerAddress} from "../../../serverAddress/serverAdress";



const MyTextAreaInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);

    return (
        <div className='form-input-group'>
            <label className="form-label" htmlFor={props.id || props.name}>{label}</label>
            <textarea className="form-input form-control" {...field} {...props}  required/>
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </div>
    );
};

const CreateCommentary = (props) => {

    return(
        <div className="formContainers d-flex flex-column align-items-start">
            <Formik initialValues={{
                commentary: "",
            }}

                    onSubmit= { async (values, actions) => {

                        const newsID = props.newsInfo['news_id'];

                        let response = await fetch(`${ServerAddress.address}/${newsID}/commentary`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json;charset=utf-8',
                                'Authorization': localStorage.getItem('USER'),
                            },
                            body: JSON.stringify(values),
                        });
                        let jsonResponse = await response.json();

                        console.log(jsonResponse);

                        actions.setSubmitting(false);
                        actions.resetForm();
                    }}
            >

                <Form>
                    <MyTextAreaInput
                        label=""
                        name="commentary"
                        type="textarea"
                        placeholder="Write a commentary..."
                    />

                    <button className='btn btn-sm btn-primary' type={'Submit'}>Send</button>
                </Form>
            </Formik>
        </div>
    )
}

export default CreateCommentary;