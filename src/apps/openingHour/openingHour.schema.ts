import * as yup from 'yup';

export const openingHourSchema = yup.object().shape({
  day_of_week: yup.string().required('O dia da semana é obrigatório'),
  hour_open: yup.string().required('A hora de abertura é obrigatória'),
  hour_closed: yup.string().required('A hora de fechamento é obrigatória'),
  restaurantId: yup.number().integer().required('O ID do restaurante é obrigatório'),
});