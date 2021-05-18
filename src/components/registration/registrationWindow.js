import React, {useState} from "react";
import  {Formik, Form, useField} from "formik";

import "./registrationWindow.css";
import {RegValidation} from "./regValidation";
import ServerMsgHandler from "../serverMsgHandler/serverMsgHandler";
import VkRegistration from "./vkRegistration";
import FbRegistration from "./fbRegistration";
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

const SignupForm = (props) => {
    const [serverMessage, setServerMessage] = useState(false)

    const showServerMessage = (msg, duration) => {
        setServerMessage(msg);
        setTimeout(() => setServerMessage(false), duration);
    }

    return(
        <div>
            <div className={"formContainers"}>
                <h1>Registration</h1>
                <Formik initialValues={{
                            login: "",
                            firstName: "",
                            lastName: "",
                            email: "",
                            password: "",
                            confirmPassword: "",
                        }}
                        validationSchema={RegValidation.validationScheme}
                        onSubmit={async (values, actions) => {

                            let response = await fetch(`${ServerAddress.address}/SignUp`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json;charset=utf-8'
                                },
                                body: JSON.stringify(values),
                            });
                            let jsonResponse = await response.json();
                            console.log(jsonResponse.msg);

                            showServerMessage(jsonResponse.msg, 2000);

                            actions.setSubmitting(false);
                            //actions.resetForm();
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
                            label="First Name:"
                            name="firstName"
                            type="text"
                            placeholder=""
                        />

                        <MyTextInput
                            label="Last Name:"
                            name="lastName"
                            type="text"
                            placeholder=""
                        />

                        <MyTextInput
                            label="email:"
                            name="email"
                            type="text"
                            placeholder="example@mail.com"
                        />

                        <MyTextInput
                            label="Password:"
                            name="password"
                            type="password"
                            placeholder=""
                        />

                        <MyTextInput
                            label="Confirm password:"
                            name="confirmPassword"
                            type="password"
                            placeholder=""
                        />
                        <button type={'Submit'}>Отправить</button>
                    </Form>
                </Formik>

                <VkRegistration showServerMessage={(msg, duration) => showServerMessage(msg, duration)}/>

                <FbRegistration showServerMessage={(msg, duration) => showServerMessage(msg, duration)}/>
        </div>
            {serverMessage ? <ServerMsgHandler text={serverMessage}>{serverMessage}</ServerMsgHandler> : null}
    </div>
    )
}

export default SignupForm;