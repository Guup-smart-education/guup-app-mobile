import {SmartInputProps} from './../@types/smart.input';

export default [
  {
    name: 'title',
    placeholder: 'Qual é o nome do tópico?',
    keyboardType: 'default',
    title: 'Diga para a gente o nome da colleção',
    type: 'inputArea',
  },
  {
    name: 'description',
    placeholder: 'Uma breve descrição',
    keyboardType: 'default',
    title: 'Digite uma breve descrição da colleção',
    type: 'inputArea',
  },
] as Array<SmartInputProps>;
