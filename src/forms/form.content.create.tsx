import {SmartInputProps} from './../@types/smart.input';

export default [
  {
    name: 'title',
    placeholder: 'Escreva um título para o conteúdo',
    keyboardType: 'default',
    title: 'Qual seria o título do seu conteúdo?',
    type: 'inputArea',
  },
  {
    name: 'description',
    placeholder: 'Uma breve descrição',
    keyboardType: 'default',
    title: 'Digite uma breve descrição do seu conteúdo',
    type: 'inputArea',
  },
] as Array<SmartInputProps>;
