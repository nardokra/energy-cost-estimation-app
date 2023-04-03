// Utils
import cx from 'classnames';

interface ReadOnlyFieldType {
  className?: string;
  topLabel?: string;
  helperText?: string;
  prefix?: string;
  value?: string;
}

export const readOnlyFieldTestIds = {
  topLabelTag: 'topLabelTag',
  helperTextTag: 'helperTextTag',
  valueTag: 'valueTag',
};

export const ReadOnlyField = ({
  className,
  topLabel,
  helperText,
  value,
}: ReadOnlyFieldType): JSX.Element | null =>
  !value && !topLabel ? null : (
    <div className={cx('mt-3', className)}>
      {!!topLabel && (
        <label
          className='ml-2 font-medium'
          data-testid={readOnlyFieldTestIds.topLabelTag}
        >
          <span>{topLabel}</span>
        </label>
      )}
      {!!value && (
        <div
          className='flex mt-1 px-3.5 py-[16.5px] border rounded-sm border-black/[.25]'
          data-testid={readOnlyFieldTestIds.valueTag}
        >
          {!!value && <span>{value}</span>}
        </div>
      )}
      {!!helperText && (
        <span
          className='text-black opacity-60 text-sm mx-3.5 w-full'
          data-testid={readOnlyFieldTestIds.helperTextTag}
        >
          {helperText}
        </span>
      )}
    </div>
  );
