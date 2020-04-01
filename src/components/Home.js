import React from "react";
import BCard from "./BCard";
export default function Home() {
  return (
    <div className="form-1 grid grid-col-3">
      <BCard
        title="Add Layout"
        subTitle="lorem ipsum"
        text="something"
        link="layouts/new"
      />
      <BCard
        title="Manage Layouts"
        subTitle="lorem ipsum"
        text="something"
        link="layouts"
      />
      <BCard
        title="Add Employee"
        subTitle="lorem ipsum"
        text="something"
        link="employees/new"
      />
      <BCard
        title="Manage Employees"
        subTitle="lorem ipsum"
        text="something"
        link="employees"
      />
      <BCard
        title="Employees List"
        subTitle="lorem ipsum"
        text="something"
        link="employees/all"
      />
      <BCard
        title="Manage Profile"
        subTitle="lorem ipsum"
        text="something"
        link="profile"
      />
    </div>
  );
}
