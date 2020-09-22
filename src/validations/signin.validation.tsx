import * as yup from 'yup';

export default yup.object().shape({
  email: yup
    .string()
    .required('Pata te ajudar, preciso de teu e-mail')
    .email('Este e-mail não parece válido'),
});
