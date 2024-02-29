import { ReactNode, RefObject } from "react";

type PopoverProps = {
  children: ReactNode;
  isVisible: boolean;
  parentRef: RefObject<HTMLButtonElement>;
};

const Popover = ({ children, isVisible, parentRef }: PopoverProps) => {
  return isVisible && parentRef.current ? (
    <div
      style={{
        position: "absolute",
        top: parentRef.current.offsetTop + parentRef.current.offsetHeight + 5, // Position below the button
        left: parentRef.current.offsetLeft,
        padding: "10px",
        border: "1px solid #ccc",
        backgroundColor: "#ffffff",
        boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
      }}
    >
      {children}
    </div>
  ) : null;
};

export default Popover;
