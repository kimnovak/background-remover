import { ReactNode, RefObject } from "react";
import { IoMdCloseCircle } from "react-icons/io";
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
      data-testid="@components/popover"
      style={{
        top: parentRef.current.offsetTop + parentRef.current.offsetHeight + 5, // Position below the button
        left: parentRef.current.offsetLeft,
      }}
      className="popover"
    >
      <button onClick={close} className="close-btn">
        <IoMdCloseCircle fill="var(--primary-color)" size={24} />
      </button>
      {children}
    </div>
  ) : null;
};

export default Popover;
