
import { createBrowserRouter } from "react-router-dom";
import Main from "../Main/Main";
import Profile from "../../Pages/Profile/Profile";
import { Loan } from "../../Pages/Loan/Loan";
import Login from "../../Pages/Login/Login";
import Register from "../../Pages/Register/Register";
import { Deposite } from "../../Pages/Deposite/Deposite";
import Balance from "../../Pages/Balance/Balance";
import { Withdraw } from "../../Pages/Withdraw/Withdraw";


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
                path:'withdraw',
                element: <Withdraw/>
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
