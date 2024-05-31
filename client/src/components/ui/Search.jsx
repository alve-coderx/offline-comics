import React, { useState } from "react";
import ModInput from "./ModInput";
import {
  IconButton,
  Dialog,
  DialogBody,
  DialogHeader,
} from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const Search = () => {
  const [showModal, setShowModal] = useState(false);
  const handleOpen = () => setShowModal(!showModal);

  return (
    <div className="relative w-full md:block hidden">
      <MagnifyingGlassIcon
        onClick={() => setShowModal(true)}
        strokeWidth={2}
        width={25}
      />
      <Dialog
        className="rounded"
        size="xs"
        open={showModal}
        handler={handleOpen}
      >
        <DialogHeader>
          <ModInput placeholder="বই অথবা লেখকের নাম দিয়ে অনুসন্ধান করুন" />
        </DialogHeader>
        <DialogBody>
          <div className="flex items-center justify-center ">
            <img
              src="./usericon.png"
              alt="searchGIF"
              className="w-32 rounded-full"
            />
          </div>
          {/* {data?.products?.length > 0 ? (
            <div className="grid md:grid-cols-2 grid-cols-2 gap-2">
              {data?.products?.map((product, index) => (
                <Link
                  onClick={() => {
                    setShowModal(false);
                  }}
                  to={`/products/${product?._id}`}
                  key={index}
                >
                  <div className="flex md:flex-row flex-col gap-2 ">
                    <img
                      src={product?.images[0]?.url}
                      className="w-20 border p-1"
                      alt="searchGIF"
                    />
                    <div>
                      {product?.discount > 0 ? (
                        <div className="flex gap-2">
                          <FontXL text={`৳ ${product?.discountprice}`} />
                          <p className="text-lg text-red-500 line-through">
                            ৳{product?.price}
                          </p>
                        </div>
                      ) : (
                        <p className="text-lg text-secondaryT">
                          ৳{product?.price}
                        </p>
                      )}
                      <FontXS text={product?.name} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center ">
              <img src="./search.gif" alt="searchGIF" className="w-64" />
            </div>
          )} */}
        </DialogBody>
      </Dialog>
    </div>
  );
};

export default Search;
