import React from "react";
import BCard from "./BCard";
import SuperMarket from "./SuperMarket";
export default function Home() {
  return (
    <>
      <div className="container">
        <SuperMarket />
      </div>
      <div className="form-1 grid grid-col-3">
        <BCard
          title="Inventory Management"
          subTitle="Manage Your Items and Stocks"
          text=""
          link="inventory"
        />
        <BCard
          title="Manage Items Location"
          subTitle="Assign Location to items"
          text=""
          link="layouts"
        />
        <BCard
          title="Employee Management"
          subTitle="Manage new employee accounts"
          text=""
          link="employees"
        />
        <BCard
          title="Edit Profile"
          subTitle="Edit your personal details"
          text=""
          link="profile"
        />
        <BCard
          title="Change Password"
          subTitle="change your password"
          text=""
          link="profile"
        />
        <BCard
          title="Manage Profile"
          subTitle="manage your data with us"
          text=""
          link="profile"
        />
        <BCard
          title="Change Active Status"
          subTitle="change your status, if you are opened or closed today"
          text=""
          link="profile"
        />
      </div>
    </>
  );
}
