import {FieldError} from 'react-hook-form';

export interface ErrorMap {
  [key: string]: FieldError | undefined;
}

export interface SmartFormProps {
  children: any;
  register: ({name}: {name: string}) => void;
  errors: ErrorMap;
  currentInput?: number;
  setValue: (name: string, value: string, validate?: boolean) => void;
}
