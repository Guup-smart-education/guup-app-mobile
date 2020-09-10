import {SmartInputProps} from './../@types/smart.input';

enum inputs {
  'username' = 'username',
  'email' = 'email',
  'phone' = 'phone',
}

export default [
  {
    name: inputs.username,
    placeholder: 'Como eu posso te chamar?',
    keyboardType: 'default',
  },
  {
    name: inputs.email,
    placeholder: 'Aqui seu e-mail',
    keyboardType: 'email-address',
  },
  {
    name: inputs.phone,
    placeholder: 'Digite seu telefone aqui',
    keyboardType: 'number-pad',
  },
] as Array<SmartInputProps>;
