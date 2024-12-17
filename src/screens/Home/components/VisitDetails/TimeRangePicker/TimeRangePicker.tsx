import { Checkbox } from "@/components/ui/checkbox";
import { TimePicker } from "./TimePicker";
import { useState } from "react";

export const TimeRangePicker = () => {
  const [isTimePickerOpen, setIsTimePickerOpen] = useState<boolean>(false);

  return (
    <>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="terms"
          onCheckedChange={() => setIsTimePickerOpen((prev) => !prev)}
        />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Wybierz konkretny przedział godzinowy
        </label>
      </div>
      {isTimePickerOpen && (
        <div className="flex gap-4">
          <TimePicker mode="from" />
          <TimePicker mode="to" />
        </div>
      )}
    </>
  );
};
