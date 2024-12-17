"use client";

import { FC, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { FormField, FormItem } from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { ChevronDown } from "lucide-react";
import { setHourRange } from "@/utils/setHourRange";

type TimePickerProps = {
  mode: "from" | "to";
};

export const TimePicker: FC<TimePickerProps> = ({ mode }) => {
  const form = useFormContext();
  const [selectedHour, setSelectedHour] = useState<number | null>(null);

  const visitDate = form.watch("visitDate");
  const timeFrom = form.watch("time.from");
  const hoursRange = setHourRange(visitDate, timeFrom, mode);

  return (
    <FormField
      control={form.control}
      name={`time.${mode}`}
      render={() => (
        <FormItem className="w-6/12">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="secondary"
                className={cn(
                  "w-full justify-between bg-transparent border-b-2 border-[#e8eaeb] rounded-none p-0",
                  selectedHour === null && "text-muted-foreground"
                )}
              >
                {selectedHour !== null
                  ? `${String(selectedHour).padStart(2, "0")}:00`
                  : mode === "from"
                  ? "Od"
                  : "Do"}
                <ChevronDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandList>
                  <CommandGroup>
                    {hoursRange.map((hour) => (
                      <CommandItem
                        key={hour}
                        onSelect={() => {
                          form.setValue(`time.${mode}`, hour);
                          setSelectedHour(hour);
                        }}
                        className={cn(
                          "cursor-pointer",
                          selectedHour === hour && "bg-gray-200"
                        )}
                      >
                        {`${String(hour).padStart(2, "0")}:00`}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </FormItem>
      )}
    />
  );
};
