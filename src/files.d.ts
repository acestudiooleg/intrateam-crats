declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.scss' {
  interface IClassNames {
    [className: string]: string;
  }
  const classNames: IClassNames;
  export = classNames;
}
