import * as yup from 'yup';

export const categorySchema = yup.object().shape({
  name: yup.string().required('O nome da categoria é obrigatório').max(64, 'O nome da categoria deve ter no máximo 64 caracteres'),
});