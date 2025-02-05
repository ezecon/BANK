import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
  } from "@material-tailwind/react";
import LoanRequirements from "./LoanRequirement";
import LoanRequest from "./LoanRequest";
import LoanStatus from "./LoanStatus";
   
  export function Loan() {
    const data = [
      {
        label: "Loan Requirement",
        value: "html",
        desc: <LoanRequirements/>,
      },
      {
        label: "Loan Request",
        value: "react",
        desc: <LoanRequest/>,
      },
      {
        label: "Loan Status",
        value: "vue",
        desc: <LoanStatus/>,
      },
 
    ];
   
    return (
      <div className="mt-20">
        <h1 className="my-10 text-center text-2xl font-bold">Loan</h1>
            <Tabs value="html">
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