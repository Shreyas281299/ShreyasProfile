import { createElement } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

export function Reveal({ as = "div", className = "", children, ...props }) {
  const ref = useScrollReveal();

  return createElement(
    as,
    { ref, className: `reveal ${className}`.trim(), ...props },
    children,
  );
}
