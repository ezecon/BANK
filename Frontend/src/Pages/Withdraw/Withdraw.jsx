import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
  } from "@material-tailwind/react";
import WithdrawHistory from "./WithdrawHistory";
import WithdrawRequest from "./WithdrawRequest";
   
  export function Withdraw() {
    const data = [
      {
        label: "Withdraw History",
        value: "html",
        desc: <WithdrawHistory/>,
      },
      {
        label: "Withdraw Request",
        value: "react",
        desc: <WithdrawRequest/>,
      },

 
    ];
   
    return (
      <div className="mt-20">
        <h1 className="my-10 text-center text-2xl font-bold">Withdraw</h1>
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