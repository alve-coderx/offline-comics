import React from "react";
import SubTitle from "../ui/SubTitle";
import TextBody from "../ui/TextBody";
import ModTextFeild from "../ui/ModTextFeild";
import Image from "next/image";
import FlexBox from "../ui/FlexBox";
import ModLink from "../ui/ModLink";
import Button from "../ui/shared/Button";

const Register = () => {
  return (
    <section className="grid md:grid-cols-2 grid-cols-1 shadow-xl min-h-[70vh] max-w-[40rem] mx-auto py-4">
      <div className="bg-gray-100 flex border p-3 flex-col h-full justify-around">
        <div className="text-center">
          <SubTitle text="Offline Comics" />
          <TextBody
            className="font-siliguri"
            text="এ প্রবেশ করুন ফোন নাম্বার এর মাধ্যমে"
          />
        </div>
        <div className="w-full flex flex-col gap-4">
          <ModTextFeild placeholder="phone no." />
          <ModTextFeild placeholder="phone no." />
          <ModTextFeild placeholder="password" />
        </div>
        <Button className="w-full ">Login</Button>
        <div>
          <hr className="border border-gray-300 w-full flex-1" />
        </div>
        <FlexBox className="justify-around">
          <ModLink label="লগইন" href="/signin" />
          <ModLink label="লগইন" href="/signin" />
        </FlexBox>
      </div>
      <Image src="/login.png" alt="login" className="md:block hidden" width={400} height={600} />
    </section>
  );
};

export default Register;
