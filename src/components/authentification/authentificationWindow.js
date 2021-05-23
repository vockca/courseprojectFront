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
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <input className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    );
};

const LogInForm = (props) => {
    const history = useHistory();
    const [serverMessage, setServerMessage] = useState(false);

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
                        label="password:"
                        name="password"
                        type="password"
                        placeholder=""
                    />
                    <button type={'Submit'}>Log In</button>
                </Form>
            </Formik>

            <VkAuth redirectToMainPage={redirectToMainPage} showServerMessage={showServerMessage}/>

            <FacebookAuth redirectToMainPage={redirectToMainPage} showServerMessage={showServerMessage}/>

            {serverMessage ? <ServerMsgHandler text={serverMessage}>{serverMessage}</ServerMsgHandler> : null}
        </div>
    )
}


export default LogInForm;