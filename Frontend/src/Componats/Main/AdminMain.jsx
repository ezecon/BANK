import { Outlet } from "react-router-dom";
import { AdminSlidebar } from "../Sidebar/AdminSlidebar";


export default function AdminMain() {
  return (
   <div className="flex">
      <div className="w-[30%]">
        <AdminSlidebar/>
      </div>
      <div className="w-[70%]">
        <Outlet/>
      </div>
   </div>
  )
}