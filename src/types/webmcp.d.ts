import "react";

declare module "react" {
  interface FormHTMLAttributes<T> {
    toolname?: string;
    tooldescription?: string;
    toolautosubmit?: boolean | "";
  }

  interface HTMLAttributes<T> {
    toolparamtitle?: string;
    toolparamdescription?: string;
  }
}