export default function Button({
  children,
  type = 'button',
  variant = 'primary',
  className = '',
  ...props
}) {
  const classMap = {
    primary: 'btn-primary',
    outline: 'btn-outline',
    text: 'btn-text',
    danger: 'btn-danger',
    dangerOutline: 'btn-danger-outline',
    success: 'btn-success',
  };

  return (
    <button type={type} className={`${classMap[variant] ?? 'btn-primary'} ${className}`.trim()} {...props}>
      {children}
    </button>
  );
}
