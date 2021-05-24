import React, {useState} from "react";
import  {Formik, Form, useField} from "formik";

import "./registrationWindow.css";
import {RegValidation} from "./regValidation";
import ServerMsgHandler from "../serverMsgHandler/serverMsgHandler";
import VkRegistration from "./vkRegistration";
import FbRegistration from "./fbRegistration";
import {ServerAddress} from "../../serverAddress/serverAdress";
import {useHistory} from "react-router";


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

const SignupForm = (props) => {
    const history = useHistory();

    const [serverMessage, setServerMessage] = useState(false);

    const [fbWidjetVisibility, setFbWidjetVisibility] = useState(false);
    const [vkWidjetVisibility, setVkWidjetVisibility] = useState(false);

    const showServerMessage = (msg, duration) => {
        setServerMessage(msg);
        setTimeout(() => setServerMessage(false), duration);
    }

    const redirectToLogIn = () => {
        history.push("/LogIn");
    }

    return(
        <div>
            <div className={"formContainers"}>
                <h2 className='font-xl mt-4'>Registration</h2>
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

                            console.log(jsonResponse.data);
                            if (jsonResponse.data) {
                                redirectToLogIn();
                            }
                            actions.setSubmitting(false);
                            //actions.resetForm();
                        }}

                >
                    <Form className='mb-3'>
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
                        <div className='d-flex flex-row mt-4'>
                            <button className="btn btn-sm btn-primary" type={'Submit'}>Register</button>
                            <button onClick={()=>setVkWidjetVisibility(true)} className="btn btn-sm btn-primary ml-2" type={'button'}>Sign up with VK</button>
                            <button onClick={()=>setFbWidjetVisibility(true)} className="btn btn-sm btn-primary ml-2" type={'button'}>Sign up with FB</button>
                        </div>
                    </Form>
                </Formik>

                {vkWidjetVisibility && <VkRegistration setVkWidjetVisibility={setVkWidjetVisibility}
                                                       redirectToLogIn={redirectToLogIn}
                                                       showServerMessage={(msg, duration) => showServerMessage(msg, duration)}
                                        />}

                {fbWidjetVisibility && <FbRegistration setFbWidjetVisibility={setFbWidjetVisibility}
                                                       redirectToLogIn={redirectToLogIn}
                                                       showServerMessage={(msg, duration) => showServerMessage(msg, duration)}
                                        />}
        </div>
            {serverMessage ? <ServerMsgHandler text={serverMessage}>{serverMessage}</ServerMsgHandler> : null}
    </div>
    )
}

export default SignupForm;