import * as Yup from 'yup';

export const AuthValidation = {
    validationScheme : Yup.object({
        login: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .min(2, 'Must be 2 characters or more')
            .required('Required'),
        password: Yup.string()
            .max(15, 'Not that long')
            .min(5, 'Must be 5 characters or more')
            .required('Required'),
    }),
}