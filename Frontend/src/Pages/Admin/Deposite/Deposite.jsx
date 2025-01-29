import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
  } from "@material-tailwind/react";
import LoanRequest from "./LoanRequest";
import LoanStatus from "./LoanStatus";
   
  export function AdminDeposite() {
    const data = [
      {
        label: "Deposite Request",
        value: "react",
        desc: <LoanRequest/>,
      },
      {
        label: "Deposite Status",
        value: "vue",
        desc: <LoanStatus/>,
      },
 
    ];
   
    return (
      <div className="mt-20">
        <h1 className="my-10 text-center text-2xl font-bold">Deposite</h1>
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