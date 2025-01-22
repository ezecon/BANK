import { Outlet } from "react-router-dom";
import { DefaultSidebar } from "../Sidebar/Sidebar";


export default function Main() {
  return (
   <div className="flex">
      <div className="w-[30%]">
        <DefaultSidebar/>
      </div>
      <div className="w-[70%]">
        <Outlet/>
      </div>
   </div>
  )
}