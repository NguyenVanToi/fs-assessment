import { ReactNode } from "react";
import Navbar from "./Navbar";

interface IMainLayoutProps {
  children: ReactNode
}

const MainLayout = ({ children }: IMainLayoutProps) => {
  return (
    <div>
      <Navbar />
      <div className="page-content">
        {children}
      </div>
    </div>
  )
}

export default MainLayout;