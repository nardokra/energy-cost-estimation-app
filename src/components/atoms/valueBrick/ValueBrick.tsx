// Utils
import cx from 'classnames';

interface ValueBrickType {
  className?: string;
  label?: string;
  note?: string;
  prefix?: string;
  value?: string;
}

export const valueBrickTestIds = {
  labelTag: 'labelTag',
  noteTag: 'noteTag',
  prefixTag: 'prefixTag',
  valueTag: 'valueTag',
};

export const ValueBrick = ({
  className,
  label,
  note,
  prefix,
  value,
}: ValueBrickType): JSX.Element | null =>
  !value && !label ? null : (
    <div className={cx('mt-3', className)}>
      {!!label && (
        <label
          className='ml-2 font-medium'
          data-testid={valueBrickTestIds.labelTag}
        >
          <span>{label}</span>
        </label>
      )}
      {!!value && (
        <div
          className='flex font-bold text-3xl'
          data-testid={valueBrickTestIds.valueTag}
        >
          {!!prefix && (
            <span className='mr-1.5' data-testid={valueBrickTestIds.prefixTag}>
              {prefix}{' '}
            </span>
          )}
          {!!value && <span>{value}</span>}
        </div>
      )}
      {!!note && (
        <span
          className='text-black opacity-60 text-sm mx-3.5 w-full'
          data-testid={valueBrickTestIds.noteTag}
        >
          {note}
        </span>
      )}
    </div>
  );
