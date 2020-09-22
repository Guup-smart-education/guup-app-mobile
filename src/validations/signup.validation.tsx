import * as yup from 'yup';

export default yup.object().shape({
  username: yup.string().required('Para mim é importante teu nome 😢'),
  phone: yup.string().required('Prometo não mandar span 😇'),
  // code: yup.string().required(),
});
