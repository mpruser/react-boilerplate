import classnames from 'classnames';
import styles from './button.module.scss';

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
 * SCSS Module을 사용하여 Button에 Style 적용
 */
export const Button: React.FC<ButtonProps> = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  ...props
}) => {
  const classNames = classnames([
    styles['storybook-button'],
    styles[`storybook-button--${size}`],
    primary ? styles['storybook-button--primary'] : styles['storybook-button--secondary'],
  ]);

  return (
    <button type="button" className={classNames} style={{ backgroundColor }} {...props}>
      {label}
    </button>
  );
};
