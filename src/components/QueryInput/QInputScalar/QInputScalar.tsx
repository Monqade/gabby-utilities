import React from 'react';
import {
  Scalar,
  IQInputChange,
  TermValueChangeMessageOrNull,
  TermValue,
  TermOperators,
} from '../term.types';
import { GInputText, InputDataType } from '../../GenericInput';

// TODO - refactor the properties interface, single
// need to fix-up properties - only allowed ops $eq, $gt, $eq (all I suppose except $in)
// this needs to implement (already does) interface same as QInputRange
// props need to be refactor and components extend as necessary

// TODO  - implement data type integer decimal string

// TODO - Is QInput*  supposed to have label?  I think not, not <label

const noopOnChange = (termValue: TermValueChangeMessageOrNull) => {};
export const untestables = {
  noopOnChange,
};

export interface QInputScalarProps extends IQInputChange {
  formatCallbackValues?: (value: Scalar) => TermValue;
  formatDisplayValues?: (value: Scalar) => string;
  termOperator?: TermOperators;
  initialValue?: string | number;
}

export function QInputScalar({
  inputProps,
  inputDataType = 'text',
  termOperator = '$eq',
  label,
  initialValue,
  onChange = noopOnChange,

  formatDisplayValues = (value) => value + '', //in case of numeric types
  formatCallbackValues = (value: Scalar) => {
    return { [termOperator]: value } as TermValue;
  },
}: QInputScalarProps) {
  const handleChange = (value: any) => {
    if (!value || value === '') {
      onChange(null);
    } else {
      const newTermValue = {
        termLabel: formatDisplayValues(value),
        termValue: formatCallbackValues(value),
      } as TermValueChangeMessageOrNull;
      onChange(newTermValue);
    }
  };

  return (
    <GInputText
      inputProps={inputProps}
      onChange={handleChange}
      inputDataType={inputDataType}
      label={label}
      value={initialValue}
    />
  );
}
