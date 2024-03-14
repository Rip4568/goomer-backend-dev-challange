import * as yup from "yup";
/* geralmente eu gosto de fazer um arquivo especifico somente para a leitrua e passsagem do objeto
se eu não utilizasse o yup acho que tornaria esse arquivo somente para exporta uma interface
 */
export const restaurantSchema = yup.object().shape({
  name: yup.string().required(),
  address: yup.string().required(),
  photo: yup.string().url(),
});