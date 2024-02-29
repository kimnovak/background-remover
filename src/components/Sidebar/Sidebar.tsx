import { ReactNode } from "react";

type SidebarProps = {
    children: ReactNode;
}

const Sidebar = ({children}: SidebarProps) => {
  return <div>{children}</div>;
};

export default Sidebar;
