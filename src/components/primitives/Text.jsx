import clsx from 'clsx';

function Text({ tag = 'p', content = '', className = '' }) {
  const Tag = tag;

  return (
    <Tag
      className={clsx(`text-start ${className}`, {
        'font-bold text-xl': tag === 'h1',
        'text-lg font-semibold': tag === 'h2',
        'text-md font-semibold': tag === 'h4',
        'text-sm font-medium': tag === 'h5',
        'text-xs': tag === 'p',
      }, ``
      )}
    >
      {content}
    </Tag>
  );
}

export default Text;
