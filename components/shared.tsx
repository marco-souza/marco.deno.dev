import { ReactNode } from "react";
import { Link } from "aleph/react";

export interface ChildrenProps {
  children: ReactNode;
}
export interface ContainerProps extends ChildrenProps {
  className?: string;
}
export interface ButtonProps extends ContainerProps {
  to?: string;
}

export function Container({ children, className = "" }: ContainerProps) {
  const composedClassName = `max-w-4xl px-8 mx-auto ${className}`;
  return <div className={composedClassName}>{children}</div>;
}

export function ButtonLink(
  { children, to = "#", className = "" }: ButtonProps,
) {
  const composedClassName = `
    uppercase inline-block px-8 py-2 text-sm font-medium transition border border-current
    rounded hover:scale-110 hover:shadow-xl active:opacity-50
    focus:outline-none focus:ring ${className}
  `;
  return (
    <Link
      className={composedClassName}
      to={to}
    >
      {children}
    </Link>
  );
}
