import { ReactNode } from "react";

export interface ChildrenProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className = "" }: ChildrenProps) {
  return <div className={`max-w-4xl px-8 mx-auto ${className}`}>{children}</div>;
}
