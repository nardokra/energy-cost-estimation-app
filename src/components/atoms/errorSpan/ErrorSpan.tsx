import cx from 'classnames';

interface ErrorSpanType {
  children?: React.ReactNode;
  className?: string;
  maxWidth?: boolean;
  testId?: string;
}

export const ErrorSpan = ({
  children,
  className,
  maxWidth,
  testId,
}: ErrorSpanType): JSX.Element | null =>
  !children ? null : (
    <span
      className={cx(
        'flex text-red-500 text-left text-sm',
        maxWidth && 'w-full',
        className
      )}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...(!!testId && { 'data-testid': testId })}
    >
      {children}
    </span>
  );
