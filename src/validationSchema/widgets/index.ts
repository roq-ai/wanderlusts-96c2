import * as yup from 'yup';

export const widgetValidationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().nullable(),
  style_settings: yup.string().required(),
  organization_id: yup.string().nullable().required(),
});
