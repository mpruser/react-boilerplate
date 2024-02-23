declare module '*.jpg' {
  const value: string;
  export default value;
}

declare module '*.jpeg' {
  const value: string;
  export default value;
}

declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.gif' {
  const value: string;
  export default value;
}

declare module '*.webp' {
  const value: string;
  export default value;
}

declare module '*.svg' {
  const content: string;
  export default content;

  import React = require('react');
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
}

declare module '*.module.css' {
  const mapping: Record<string, string>;
  export default mapping;
}

declare module '*.module.scss' {
  const mapping: Record<string, string>;
  export default mapping;
}

declare module '*.module.sass' {
  const mapping: Record<string, string>;
  export default mapping;
}
