import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
  } from "@material-tailwind/react";
  import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    Cog6ToothIcon,
  } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
   
  export function AdminSlidebar() {
    return (
      <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
        <div className="mb-2 p-4">
          <Typography variant="h5" color="blue-gray">
            Dashboard
          </Typography>
        </div>
        <List>
       <Link to="loan">
          <ListItem>
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            LOAN
          </ListItem>
          </Link>
          <Link to="deposite">
          <ListItem>
            <ListItemPrefix>
              <ShoppingBagIcon className="h-5 w-5" />
            </ListItemPrefix>
            DEPOSIT
          </ListItem>
          </Link>
          <Link to="money-transfer">
          <ListItem>
            <ListItemPrefix>
              <Cog6ToothIcon className="h-5 w-5" />
            </ListItemPrefix>
            MONEY TRANSFER
          </ListItem>
          </Link>
          <Link to="balance">
          <ListItem>
            <ListItemPrefix>
              <Cog6ToothIcon className="h-5 w-5" />
            </ListItemPrefix>
            Balance
          </ListItem>
          </Link>
          
        </List>
      </Card>
    );
  }