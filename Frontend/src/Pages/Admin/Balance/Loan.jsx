import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
  } from "@material-tailwind/react";
import LoanRequest from "./LoanRequest";
import LoanStatus from "./LoanStatus";
   
  export function AdminBalance() {
    const data = [
      {
        label: "Add Balance",
        value: "react",
        desc: <LoanRequest/>,
      },
      {
        label: " Withdraw Balance",
        value: "vue",
        desc: <LoanStatus/>,
      },
 
    ];
   
    return (
      <div className="mt-20">
        <h1 className="my-10 text-center text-2xl font-bold">Balance</h1>
            <Tabs value="react">
                <TabsHeader>
                {data.map(({ label, value }) => (
                    <Tab key={value} value={value}>
                    {label}
                    </Tab>
                ))}
                </TabsHeader>
                <TabsBody>
                {data.map(({ value, desc }) => (
                    <TabPanel key={value} value={value}>
                    {desc}
                    </TabPanel>
                ))}
                </TabsBody>
            </Tabs>
      </div>
    );
  }