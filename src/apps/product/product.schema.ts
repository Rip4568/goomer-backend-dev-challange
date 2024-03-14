import * as yup from 'yup';

export const productSchema = yup.object().shape({
  photo: yup.string().nullable(),
  name: yup.string().required('O nome do produto é obrigatório'),
  price: yup.number().positive().required('O preço do produto é obrigatório e deve ser positivo'),
  promoDescription: yup.string().nullable(),
  promoPrice: yup.number().positive().nullable(),
  promoDays: yup.string().nullable(),
  restaurantId: yup.number().integer().required('O ID do restaurante é obrigatório'),
  categoryId: yup.number().integer().nullable(),
});