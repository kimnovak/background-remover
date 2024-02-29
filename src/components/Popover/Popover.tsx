import { ReactNode, RefObject } from "react";
import "./Popover.css";

type PopoverProps = {
  children: ReactNode;
  isVisible: boolean;
  parentRef: RefObject<HTMLButtonElement>;
  close: () => void;
};

const Popover = ({ children, isVisible, parentRef, close }: PopoverProps) => {
  return isVisible && parentRef.current ? (
    <div
      style={{
        top: parentRef.current.offsetTop + parentRef.current.offsetHeight + 5, // Position below the button
        left: parentRef.current.offsetLeft,
      }}
      className="popover"
    >
      <button onClick={close} className="close-btn">X</button>
      {children}
    </div>
  ) : null;
};

export default Popover;
