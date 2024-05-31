import React from "react";
import { Chip } from "@/components/elements";
import { QueryClient } from "@tanstack/react-query";
import TextBody from "../ui/TextBody";
import PageHeader from "../PageHeader";
import { formatDate } from "@/utils/formateDate";

const data = {
  order: {
    _id: "h-um0dyrY",
    customer: {
      name: "Jack",
      number: "01994472362",
      district: "Bandarban",
      address: "narayanganj",
    },
    orderItems: [
      {
        id: "660852bb88626a9261aec49b",
        image:
          "https://res.cloudinary.com/dsqqbgmmn/image/upload/v1711796154/re4hlzerekxynfmxqhl7.jpg",
        price: 700,
        name: "Formal Pant Trouser-Navy",
        variation: [
          {
            targetType: "Demo Type",
            targetOptionValues: ["Option1", "Option2"],
          },
        ],
        quantity: 4,
        shipping: false,
      },
    ],
    uid: "lu0w9rw8-32h6l",
    total: 770,
    subtotal: 700,
    shipping: 70,
    orderStatus: "Processing",
    note: "",
    paymentStatus: "COD",
    createdAt: "2024-04-07T06:49:40.535Z",
    __v: 0,
  },
};

const OrderDetails = async ({ id }) => {
  // const queryClient = new QueryClient();
  // const data = await queryClient.fetchQuery({
  //   queryKey: ["order", { id }],
  //   queryFn: () => getOrder(id),
  // });
  return (
    <div className="max-w-[1200px] mx-auto">
      <PageHeader title="Order Details" />
      <div className="grid md:grid-cols-4 items-start grid-cols-1 ">
        <div className="bg-white md:col-span-3 rounded-lg p-5 ">
          <div className="flex items-cener justify-between bdata?.order-b pb-4">
            <div className="flex items-center gap-2">
              <TextBody text="Order No :" />
              <TextBody text={`#${data?.order?._id}`} />
            </div>
            <Chip value={data?.order?.orderStatus} variant="ghost" size="sm" />
          </div>
          <div className="flex items-center py-6 justify-between">
            <div>
              <TextBody text="Order Date" />
              <p>{formatDate(data?.order?.createdAt)}</p>
            </div>
            <div>
              <TextBody text="Name" />
              <p>{data?.order?.customer?.name}</p>
            </div>
            <div>
              <TextBody text="Number" />
              <p>{data?.order?.customer?.number}</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-2">
            <div className="flex items-start gap-3 flex-col bg-gray-100  rounded-lg shadow-sm p-5">
              <TextBody text="Delivery Address" />
              <p>{data?.order?.customer?.name}</p>
              <p>{data?.order?.customer?.address}</p>
              <p>{data?.order?.customer?.district}</p>
              <p>{data?.order?.customer?.number}</p>
            </div>
            <div className="flex items-start gap-3 flex-col bg-gray-100  rounded-lg shadow-sm p-5">
              <TextBody text="Customer Note" />
              <p>{data?.order?.note}</p>
            </div>
          </div>
        </div>
        <div className="bg-white flex flex-col items-start gap-5 rounded-lg p-5">
          <TextBody text="Billing Details" />
          <p>Payment Status : {data?.order?.paymentStatus}</p>
          <p>Sub Total : {data?.order?.subtotal} Tk</p>
          <p>Shipping Charge : {data?.order?.shipping} Tk</p>
          <p>Total : {data?.order?.total} Tk</p>
        </div>
        <div className="bg-white md:col-span-3  gap-5 rounded-lg p-5">
          <TextBody text="Order Items" />
          {data?.order?.orderItems?.map((item, index) => (
            <div
              key={index}
              className="grid lg:flex bdata?.order p-4 justify-between items-start grid-cols-4  my-5"
            >
              <img
                src={item?.image}
                className="w-20 h-20 rounded-lg object-cover"
                alt="image"
              />
              <div>
                <p className="s-caption ">{item?.name}</p>
                <div className="grid grid-cols-1">
                  {item?.selectedOptions?.map((v, index) => (
                    <div className="flex items-center gap-2 " key={index}>
                      <p className="text-sm">{v?.targetType} :</p>
                      <div className="flex items-center gap-2">
                        {v?.targetOptionValues?.map((item, cIndex) => (
                          <TextBody
                            key={cIndex}
                            className="uppercase "
                            text={item}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <p className="s-caption">X {item?.quantity} </p>
              <p className="s-caption">{item?.price} Tk</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
