import {SmartInputProps} from './../@types/smart.input';

enum inputs {
  'username' = 'username',
  'email' = 'email',
  'phone' = 'phone',
}

export default [
  {
    name: inputs.username,
    placeholder: 'Me fala teu nome?',
    keyboardType: 'default',
  },
  {
    name: inputs.phone,
    placeholder: 'E teu telefone?',
    keyboardType: 'number-pad',
  },
] as Array<SmartInputProps>;
