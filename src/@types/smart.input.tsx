import {TextInputProps} from 'react-native';
import {FieldError} from 'react-hook-form';

export enum EInput {
  'input' = 'input',
  'inputArea' = 'inputArea',
  'gallery' = 'gallery',
}

export interface SmartInputProps extends TextInputProps {
  readonly autoCorrect?: boolean;
  readonly placeholder?: string | '';
  readonly focus?: boolean;
  readonly loading?: boolean;
  readonly name: string;
  readonly error?: FieldError | undefined;
  readonly label?: string;
  readonly title?: string;
  readonly type?: keyof typeof EInput;
}
