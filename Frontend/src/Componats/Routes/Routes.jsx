
import { createBrowserRouter } from "react-router-dom";
import Main from "../Main/Main";
import Profile from "../../Pages/Profile/Profile";
import { Loan } from "../../Pages/Loan/Loan";
import Login from "../../Pages/Login/Login";
import Register from "../../Pages/Register/Register";
import { Deposite } from "../../Pages/Deposite/Deposite";
import Balance from "../../Pages/Balance/Balance";
import { Transfer } from "../../Pages/Withdraw/Transfer";
import AdminMain from "../Main/AdminMain";
import { AdminLoan } from "../../Pages/Admin/Loan/Loan";
import { AdminMoneyTransfer } from "../../Pages/Admin/MoneyTranfer/MoneyTransfer";
import { AdminDeposite } from "../../Pages/Admin/Deposite/Deposite";
import { AdminBalance } from "../../Pages/Admin/Balance/Loan";


const router = createBrowserRouter([
    {
        path:"/",
        element: <Main/>,
        children:[
           { 
                path:'',
                element: <Profile/>
           },
           { 
                path:'profile',
                element: <Profile/>
           },
           { 
                path:'loan',
                element: <Loan/>
           },
           { 
                path:'deposite',
                element: <Deposite/>
           },
           { 
                path:'balance',
                element: <Balance/>
           },
           { 
                path:'money-transfer',
                element: <Transfer/>
           },
        ]
    },
    {
          path:"/admin",
          element: <AdminMain/>,
          children:[
             {

                path:'loan',
                element: <AdminLoan/>
             },
             {

                path:'money-transfer',
                element: <AdminMoneyTransfer/>
             },
             {

                path:'deposite',
                element: <AdminDeposite/>
             },
             {

                path:'balance',
                element: <AdminBalance/>
             },
          ]
    },
    {
     path:"/login",
     element: <Login/>

    },
    {
     path:"/register",
     element: <Register/>

    }

]);

export default router;
