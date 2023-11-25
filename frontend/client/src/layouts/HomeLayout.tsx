import React, { ReactNode } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
interface HomeLayoutProps {
  children: ReactNode;
}
function HomeLayout(props: HomeLayoutProps) {
  return (
    <div>
      <Header />
      <div>
        <Sidebar />
        <main>{props.children}</main>
      </div>
    </div>
  );
}

export default HomeLayout;
