import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
} from 'react';
import classNames from 'classnames';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm, Controller, DefaultValues} from 'react-hook-form';
import {isUndefined} from 'lodash';

import Input from '../../Input';
import Button from '../../Button';
import CheckboxRow from '../../CheckboxRow';
import Verification from '../../Verification';

import {IFormProps} from './types';
import styles from './Form.module.scss';

const Form = forwardRef<any, IFormProps>(
  (
    {
      form: {fields, schema},
      onSubmit,
      submitText,
      formHandler,
      className = '',
      labelText = '',
      inputClassName = '',
      labelClassName = '',
      innerClassName = '',
      addFormBtnClasses = '',
    },
    ref,
  ) => {
    const defaultValues = useMemo(
      () =>
        fields.reduce<DefaultValues<any>>((acc, curVal) => {
          const {defaultValue, name} = curVal;

          if (!isUndefined(defaultValue) && name) {
            acc[name] = defaultValue;
          }

          return acc;
        }, {}),
      [fields],
    );

    const {
      control,
      register,
      setFocus,
      handleSubmit,
      formState: {errors, isValid},
    } = useForm({
      defaultValues,
      mode: 'onChange',
      reValidateMode: 'onChange',
      resolver: yupResolver(schema),
    });

    const formClasses = classNames(styles.container, {
      [className]: className,
    });

    const disabledButtonClasses = classNames(styles.container__button, {
      [styles.container__button_disabled]: !isValid,
      [addFormBtnClasses]: addFormBtnClasses,
    });

    const renderField = useCallback(
      (name, {labelOptions, ...rest}) => {
        const commonProps = {
          key: name,
          ...rest,
          ...register(name),
          error: errors[name]?.message,
        };

        switch (rest.type) {
          case 'checkbox':
            return (
              <CheckboxRow
                key={name}
                inputProps={commonProps}
                labelOptions={labelOptions}
              />
            );
          case 'verification':
            return (
              <Controller
                name={name}
                key={name}
                control={control}
                {...rest}
                render={(props) => (
                  <Verification
                    key={name}
                    inputProps={commonProps}
                    value={props.field.value}
                    onClick={props.field.onChange}
                  />
                )}
              />
            );

          default:
            return (
              <Input
                labelText={labelText}
                className={inputClassName}
                labelClassName={labelClassName}
                innerClassName={innerClassName}
                {...commonProps}
              />
            );
        }
      },
      [
        errors,
        control,
        register,
        labelText,
        inputClassName,
        labelClassName,
        innerClassName,
      ],
    );

    const renderFields = useCallback(
      () => fields.map(({name, ...rest}) => renderField(name, rest)),
      [fields, renderField],
    );

    const onSubmitFailed = useCallback(() => {
      setFocus(fields[0].name as string);
    }, [fields, setFocus]);

    useImperativeHandle(
      ref,
      () => ({
        onSubmitFailed,
      }),
      [onSubmitFailed],
    );

    return (
      <form
        autoComplete="off"
        className={formClasses}
        onSubmit={handleSubmit(onSubmit)}>
        {renderFields()}
        <Button
          size="large"
          type="submit"
          disabled={!isValid}
          onClick={formHandler}
          className={disabledButtonClasses}>
          {submitText}
        </Button>
      </form>
    );
  },
);

export default Form;
