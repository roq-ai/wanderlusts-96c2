import * as yup from 'yup';

export const destinationValidationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().nullable(),
  location: yup.string().required(),
  organization_id: yup.string().nullable().required(),
});
