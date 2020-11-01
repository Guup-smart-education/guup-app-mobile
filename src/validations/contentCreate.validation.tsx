import * as yup from 'yup';

export default yup.object().shape({
  title: yup.string().required('Digite o nome do seu conteudo'),
  description: yup.string().required('Digite uma breve descrição'),
  // photo: yup.string(),
  // kind: yup.string().required('Seleciona a disponibilidade'),
  // content: yup.string().required('Faz upload do conteudo'),
});
