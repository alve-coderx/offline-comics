import React from "react";
import { Drawer, Card } from "@/components/elements";

export default function Sidebar({
  isDrawerOpen,
  setCartDrawer,
  placement,
  List,
}) {
  const closeDrawer = () => setCartDrawer(false);

  return (
    <Drawer placement={placement} open={isDrawerOpen} onClose={closeDrawer}>
      <Card
        color="transparent"
        shadow={false}
        className="h-[95vh] overflow-y-auto w-full p-2 "
      >
        {List}
      </Card>
    </Drawer>
  );
}
