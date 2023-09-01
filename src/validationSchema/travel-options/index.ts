import * as yup from 'yup';

export const travelOptionValidationSchema = yup.object().shape({
  type: yup.string().required(),
  description: yup.string().nullable(),
  cost: yup.number().integer().required(),
  destination_id: yup.string().nullable().required(),
});
