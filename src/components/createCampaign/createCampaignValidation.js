import * as Yup from 'yup';

export const CreateCampaignValidation = {
    validationScheme : Yup.object({
        campaignName: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .min(3, 'Must be 3 characters or more')
            .required('Required'),
        campaignTheme: Yup.string()
            .min(2, 'Must be 2 characters or more')
            .required('Required'),
        campaignVideo: Yup.string()
            .max(100, 'Must be 100 characters or less')
            .min(10, 'Must be 10 characters or more')
            .required('Required'),
        moneyAmount: Yup.string()
            .required('Required')
            .max(100, 'Must be 100 characters or less'),
        campaignInfo: Yup.string()
            .max(500, 'Not that long')
            .min(5, 'Must be 5 characters or more')
            .required('Required'),
        bonuses: Yup.string()
            .max(15, 'Not that long')
            .min(5, 'Must be 5 characters or more')
            .required('Required'),
        campaignPictures: Yup.string()
            .max(1000, 'Not that long')
            .required('Required'),
    }),
}