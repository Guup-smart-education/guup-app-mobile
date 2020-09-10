import {TextInputProps} from 'react-native';
import {FieldError} from 'react-hook-form';

export interface SmartInputProps extends TextInputProps {
  autoCorrect?: boolean;
  placeholder?: string | '';
  focus?: boolean;
  loading?: boolean;
  name: string;
  error?: FieldError | undefined;
}
