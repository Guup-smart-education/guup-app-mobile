import * as yup from 'yup';

export default yup.object().shape({
  collection: yup.string().required('Digite o nome da colleção'),
  description: yup.string().required('Digita a descrição do conteudo'),
  // photo: yup.string(),
  // kind: yup.string().required('Seleciona a disponibilidade'),
  // content: yup.string().required('Faz upload do conteudo'),
});
