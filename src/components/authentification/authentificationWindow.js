import React, {useState} from "react";
import  {Formik, Form, useField} from "formik";
import {
    useHistory,
} from "react-router-dom";

import {AuthValidation} from "./authValidation";
import ServerMsgHandler from "../serverMsgHandler/serverMsgHandler";
import VkAuth from "./vkAuth";
import FacebookAuth from "./facebookAuth";
import {ServerAddress} from "../../serverAddress/serverAdress";


const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div className='form-input-group'>
            <label className="form-label" htmlFor={props.id || props.name}>{label}</label>
            <input className="text-input form-input form-control" {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </div>
    );
};

const LogInForm = (props) => {
    const history = useHistory();
    const [serverMessage, setServerMessage] = useState(false);
    const [widjetFbVisibility, setwidjetFbVisibility] = useState(false);
    const [widjetVkVisibility, setwidjetVkVisibility] = useState(false);

    const redirectToMainPage = () => {
        history.push(`/MainPage`);
    }

    const showServerMessage = (msg, duration) => {
        setServerMessage(msg);
        setTimeout(() => setServerMessage(false), duration);
    }

    return(
        <div className={"formContainers"}>
            <h1>Log in</h1>
            <Formik initialValues={{
                login: "",
                password: "",
            }}
                    validationSchema={AuthValidation.validationScheme}
                    onSubmit={ async (values, actions) => {
                        let response = await fetch(`${ServerAddress.address}/LogIn`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json;charset=utf-8',
                            },
                            body: JSON.stringify(values),
                        });
                        let jsonResponse = await response.json();
                        console.log(jsonResponse.msg);
                        console.log(jsonResponse.token);
                        localStorage.setItem('USER', jsonResponse.token);
                        localStorage.setItem('LOGIN', values.login);

                        showServerMessage(jsonResponse.msg, 2000);

                        if (jsonResponse.data) {
                            props.defineCurrentUser(jsonResponse.data);
                            redirectToMainPage();
                        }


                        actions.setSubmitting(false);
                        actions.resetForm();
                    }}
            >
                <Form>
                    <MyTextInput
                        label="Login:"
                        name="login"
                        type="text"
                        placeholder=""
                    />

                    <MyTextInput
                        label="Password:"
                        name="password"
                        type="password"
                        placeholder=""
                    />
                    <div className='d-flex flex-row mt-4'>
                        <button className="btn btn-sm btn-primary" type={'Submit'}>Log In</button>
                        <button className="btn btn-sm btn-primary ml-2" onClick={()=>setwidjetVkVisibility(true)}>Log in with VK</button>
                        <button className="btn btn-sm btn-primary ml-2" onClick={()=>setwidjetFbVisibility(true)}>Log in with Facebook</button>
                    </div>

                </Form>
            </Formik>

            {widjetVkVisibility && <VkAuth
                setwidjetVkVisibility={setwidjetVkVisibility}
                redirectToMainPage={redirectToMainPage}
                showServerMessage={showServerMessage}
                defineCurrentUser={props.defineCurrentUser}
            />}

            {widjetFbVisibility && <FacebookAuth
                                    setwidjetFbVisibility={setwidjetFbVisibility}
                                    redirectToMainPage={redirectToMainPage}
                                    showServerMessage={showServerMessage}
                                    defineCurrentUser={props.defineCurrentUser}
                                    />}

            {serverMessage ? <ServerMsgHandler text={serverMessage}>{serverMessage}</ServerMsgHandler> : null}
        </div>
    )
}


export default LogInForm;