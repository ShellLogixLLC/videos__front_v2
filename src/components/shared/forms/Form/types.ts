import * as yup from 'yup';
import {SubmitHandler, FieldValues} from 'react-hook-form';

import {Route} from '~/constants';

import {InputProps} from '../../Input/types';

export type LabelOptions = {
  firstLink: Route;
  secondLink: Route;
  firstLinkText: string;
  secondLinkText: string;
};

export type Field = InputProps & {
  labelOptions?: LabelOptions;
};

export type Form = {
  fields: Field[];
  schema: yup.AnyObjectSchema;
};

export interface IFormProps<TFieldValues extends FieldValues = FieldValues> {
  form: Form;
  labelText?: string;
  submitText: string;
  className?: string;
  inputClassName?: string;
  innerClassName?: string;
  labelClassName?: string;
  addFormBtnClasses?: string;
  onSubmit: SubmitHandler<TFieldValues>;
}
