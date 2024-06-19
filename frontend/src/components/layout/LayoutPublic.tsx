import { FC, ReactNode } from "react";
import Footer from "../../pages/public/components/Footer"
import Navbar from "../../pages/public/components/Navbar"

interface LayoutProps {
    children: ReactNode;
  }
export const LayoutPublic:FC<LayoutProps> = ({children}) => {
  return (
    <>
    <Navbar />
     {
        children
     }
    <Footer />
    </>
  )
}
