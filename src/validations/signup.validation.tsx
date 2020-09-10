import * as yup from 'yup';

export default yup.object().shape({
  username: yup.string().required('Para mim é importante teu nome 😢'),
  email: yup
    .string()
    .email('Isso aí não parece um e-mail 😕')
    .required('Inicia a tua jornada com teu e-mail 💌'),
  phone: yup.string().required('Prometo não mandar span 😇'),
  // code: yup.string().required(),
});
