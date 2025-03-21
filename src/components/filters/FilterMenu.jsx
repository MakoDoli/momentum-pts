import React from "react";
import MenuButton from "./MenuButton";
import FilterList from "./FilterList";
import DepartmentsFilter from "./DepartmentsFilter";
import PrioritiesFilter from "./PrioritiesFilter";
import EmployeesFilter from "./EmployeesFilter";
import {
  getDepartments,
  getEmployees,
  getPriorities,
} from "@/service/data-service";

export default async function FilterMenu() {
  const [departments, priorities, employees] = await Promise.all([
    getDepartments(),
    getPriorities(),
    getEmployees(),
  ]);
  return (
    <div className="flex relative justify-between items-center w-[688px] rounded-[10px]  mb-[78px]">
      <FilterList />
      <div className="h-[47px] w-[785px] flex justify-between border border-gray-200 items-center px-[5px] rounded-lg ">
        <MenuButton
          PassedComponent={DepartmentsFilter}
          buttonText={"დეპარტამენტი"}
          data={departments}
        />
        <MenuButton
          PassedComponent={PrioritiesFilter}
          buttonText={"პრიორიტეტი"}
          data={priorities}
        />
        <MenuButton
          PassedComponent={EmployeesFilter}
          buttonText={"თანამშრომელი"}
          data={employees}
        />
      </div>
    </div>
  );
}
