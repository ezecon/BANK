import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
  } from "@material-tailwind/react";
import NewDeposite from "./NewDeposite";
import OldDeposite from "./OldDeposite";

   
  export function Deposite() {
    const data = [
      {
        label: "New Deposite",
        value: "new",
        desc: <NewDeposite/>,

      },
      {
        label: "Old Deposite",
        value: "old",
        desc: <OldDeposite/>,

      },
    ];
   
    return (
      <div className="mt-20">
        <h1 className="my-10 text-center text-2xl font-bold">Deposite</h1>
            <Tabs value="new">
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