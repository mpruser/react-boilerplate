import classnames from 'classnames';
import './button.css';

interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * CSS를 사용하여 Button에 Style 적용
 */
export const Button: React.FC<ButtonProps> = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  ...props
}) => {
  const classNames = classnames([
    'storybook-button',
    `storybook-button--${size}`,
    primary ? 'storybook-button--primary' : 'storybook-button--secondary',
  ]);

  return (
    <button type="button" className={classNames} style={{ backgroundColor }} {...props}>
      {label}
    </button>
  );
};
