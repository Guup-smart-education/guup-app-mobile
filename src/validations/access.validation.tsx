import * as yup from 'yup';

export default yup.object().shape({
  token: yup.string().min(5, 'O token de accesso é de 5 digitos'),
});
