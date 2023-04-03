import cx from 'classnames';

interface DescriptionBrickType {
  children?: React.ReactNode;
  className?: string;
  maxWidth?: boolean;
}

export const DescriptionBrick = ({
  children,
  className,
  maxWidth,
}: DescriptionBrickType): JSX.Element | null =>
  !children ? null : (
    <p className={cx(maxWidth && 'w-full', className)}>{children}</p>
  );
