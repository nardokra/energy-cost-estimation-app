import {
  type ChangeEvent,
  useCallback,
  type Dispatch,
  type SetStateAction,
} from 'react';

// Utils
import cx from 'classnames';

// Components
import { TextField } from '@mui/material';

interface NumberInputPropsType {
  className?: string;
  helperText?: string;
  id: string;
  insideLabel?: string;
  onChange: Dispatch<SetStateAction<Record<string, string | undefined>>>;
  positiveInput?: boolean;
  topLabel?: string;
  unitDesignation?: string;
  value?: string;
}

export const numberInputTestIds = {
  topLabelTag: 'topLabelTag',
  unitDesignationTag: 'unitDesignationTag',
};

export const NumberInput = ({
  className,
  helperText,
  id,
  insideLabel,
  onChange,
  positiveInput = false,
  topLabel,
  unitDesignation,
  value = '',
}: NumberInputPropsType): JSX.Element => {
  const updateValueState = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
      const targetValue = positiveInput
        ? parseInt(event.target.value) >= 0
          ? event.target.value
          : undefined
        : event.target.value;

      onChange((prevState) => ({
        ...prevState,
        ...{ [event.target.id]: targetValue },
      }));
    },
    [onChange, positiveInput]
  );

  const emptyValue = value === '';

  return (
    <div className={cx(className)}>
      {!!topLabel && (
        <label
          className='font-medium ml-2'
          data-testid={numberInputTestIds.topLabelTag}
        >
          <span>{topLabel}</span>
          {unitDesignation && (
            <span
              className='italic'
              data-testid={numberInputTestIds.unitDesignationTag}
            >
              {` ${unitDesignation}`}
            </span>
          )}
        </label>
      )}
      <TextField
        className='mt-1'
        helperText={helperText}
        id={id}
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', type: 'number' }}
        InputLabelProps={{
          shrink: false,
          sx: {
            opacity: emptyValue ? '0.25' : '1',
          },
        }}
        label={emptyValue ? insideLabel : undefined}
        onChange={updateValueState}
        value={value}
        fullWidth
      />
    </div>
  );
};
