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
          title="Add Employee"
          subTitle="Create a new employee account"
          text=""
          link="employees/new"
        />
        <BCard
          title="Manage Employees"
          subTitle="lorem ipsum"
          text=""
          link="employees"
        />
        <BCard
          title="Employees List"
          subTitle="lorem ipsum"
          text=""
          link="employees/all"
        />
        <BCard
          title="Manage Profile"
          subTitle="lorem ipsum"
          text=""
          link="profile"
        />
      </div>
    </>
  );
}
