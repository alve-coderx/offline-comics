import OrderDetails from "@/components/Orders/OrderDetails";
import React from "react";

const page = ({ params }) => {
  const { id } = params;

  return <div>
    <OrderDetails id={id}/>
  </div>;
};

export default page;
