"use client";

import { FC } from "react";
import { VisitDatePicker } from "@/screens/Home/components/VisitDetails/VisitDatePicker";
import { SearchableSelect } from "@/screens/Home/components/SearchableSelect";

import {
  languages,
  specializations,
  topics,
  visitTypes,
} from "@/data/mockData";
import { TimeRangePicker } from "./TimeRangePicker";

type VisitDetailsProps = {
  ref: React.RefObject<HTMLDivElement | null>;
};

export const VisitDetails: FC<VisitDetailsProps> = ({ ref }) => {
  return (
    <div
      ref={ref}
      className="flex flex-col gap-4 bg-[#fefefe] p-10 rounded-md border-2 border-[#f1f1f2]"
    >
      <h3 className="text-3xl font-extralight text-[#586985]">Wizyta</h3>
      <SearchableSelect
        data={visitTypes}
        category="visitType"
        controlName="visitType"
      />
      <SearchableSelect
        data={specializations}
        category="specialization"
        controlName="specialization"
      />
      <VisitDatePicker />
      <TimeRangePicker />
      <SearchableSelect data={topics} category="topic" controlName="topic" />
      <SearchableSelect
        data={languages}
        category="language"
        controlName="language"
      />
    </div>
  );
};
