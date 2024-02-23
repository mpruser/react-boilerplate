import classnames from 'classnames';
import styled from 'styled-components';

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
   * Button class name
   */
  className?: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

export const ButtonComponent: React.FC<ButtonProps> = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  className,
  ...props
}) => {
  const classNames = classnames([
    className,
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

/**
 * styled components를 사용하여 Button에 Style 적용
 */
export const Button = styled(ButtonComponent)`
  &.storybook-button {
    display: inline-block;
    border: 0;
    border-radius: 3em;
    font-weight: 700;
    line-height: 1;
    cursor: pointer;
    font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;

    &--primary {
      background-color: #1ea7fd;
      color: white;
    }

    &--secondary {
      background-color: transparent;
      color: #333;
      box-shadow: rgb(0 0 0 / 15%) 0 0 0 1px inset;
    }

    &--small {
      padding: 10px 16px;
      font-size: 12px;
    }

    &--medium {
      padding: 11px 20px;
      font-size: 14px;
    }

    &--large {
      padding: 12px 24px;
      font-size: 16px;
    }
  }
`;
