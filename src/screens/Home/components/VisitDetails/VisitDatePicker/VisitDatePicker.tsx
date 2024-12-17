"use client";

import { format } from "date-fns";
import { ChevronDown } from "lucide-react";
import { useFormContext } from "react-hook-form";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { enGB } from "date-fns/locale";

export const VisitDatePicker = () => {
  const {control} = useFormContext();

  return (
    <FormField
      control={control}
      name="visitDate"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel className="font-semibold text-base text-[#112950]">
            Data wizyty
          </FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"secondary"}
                  className={cn(
                    "w-[635px] justify-between bg-transparent border-b-2 border-[#e8eaeb] rounded-none p-0",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>Wybierz datę</span>
                  )}
                  <ChevronDown className="opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
              <Calendar
                locale={enGB}
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) => {
                  const today = new Date();
                  const minDate = new Date(today);
                  const maxDate = new Date(today);
                  maxDate.setDate(today.getDate() + 3);
                  minDate.setDate(today.getDate() - 1);
                  return date < minDate || date > maxDate;
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
