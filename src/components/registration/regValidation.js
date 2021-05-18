import * as Yup from 'yup';

export const RegValidation = {
    validationScheme : Yup.object({
        login: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .min(2, 'Must be 2 characters or more')
            .required('Required'),
        firstName: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .min(2, 'Must be 2 characters or more')
            .required('Required'),
        lastName: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .min(2, 'Must be 2 characters or more')
            .required('Required'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
        password: Yup.string()
            .max(15, 'Not that long')
            .min(5, 'Must be 5 characters or more')
            .oneOf([Yup.ref('confirmPassword')], 'Passwords does not match')
            .required('Required'),
        confirmPassword: Yup.string()
            .max(15, 'Not that long')
            .min(5, 'Must be 5 characters or more')
            .oneOf([Yup.ref('password')], 'Passwords does not match')
            .required('Required'),
    }),
}