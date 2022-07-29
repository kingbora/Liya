declare module "*.module.less" {
  const classes: { readonly [key: string] : string };
  export default classes;
}

declare module "*.less" {
  const classes: { readonly [key: string] : string };
  export default classes;
}

declare global {
  const __PLATFORM__: string;
}

export {}