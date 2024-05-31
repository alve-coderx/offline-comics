import React from "react";
import ClientWrapper from "./ClientWrapper";
import FlexBox from "@/components/ui/FlexBox";

const AuthWrapper = ({ children }) => {
  return <ClientWrapper>{children}</ClientWrapper>;
};

export default AuthWrapper;
