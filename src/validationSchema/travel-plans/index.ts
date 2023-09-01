import * as yup from 'yup';

export const travelPlanValidationSchema = yup.object().shape({
  date_of_travel: yup.date().required(),
  budget: yup.number().integer().required(),
  departure_location: yup.string().required(),
  destination_id: yup.string().nullable().required(),
  travel_option_id: yup.string().nullable().required(),
  user_id: yup.string().nullable().required(),
});
