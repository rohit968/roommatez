import React from "react";
import { Outlet } from "react-router-dom";
import Account from "../components/account/Account";

const AccountPage = () => {
  return (
    <>
      <Account />
      <Outlet />
    </>
  );
};

export default AccountPage;
