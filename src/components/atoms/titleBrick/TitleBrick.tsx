import cx from 'classnames';

export const TitleBrick = ({
  maxWidth,
  title,
}: {
  maxWidth?: boolean;
  title?: string;
}): JSX.Element | null => {
  const wrapperClassNames = cx(
    'flex justify-center text-white p-3.5 bg-theme-primary',
    maxWidth && 'w-full'
  );

  return !title ? null : (
    <div className={wrapperClassNames}>
      <h1>{title}</h1>
    </div>
  );
};
