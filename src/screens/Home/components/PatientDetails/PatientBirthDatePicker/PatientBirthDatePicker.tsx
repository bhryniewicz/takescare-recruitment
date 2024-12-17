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
import { FC, useEffect } from "react";
import { extractDateFromPesel } from "@/utils/extractDate";

type BirthDatePickerProps = {
  userIdx: number;
};

export const BirthDatePicker: FC<BirthDatePickerProps> = ({ userIdx }) => {
  const form = useFormContext();
  const pesel = form.watch(`patients[${userIdx}].pesel`);

  useEffect(() => {
    if (pesel && pesel.length === 11) {
      const birthDate = extractDateFromPesel(pesel);
      if (birthDate) {
        form.setValue(`patients[${userIdx}].birthDate`, birthDate);
      }
    } else {
      form.setValue(`patients[${userIdx}].birthDate`, undefined);
    }
  }, [pesel, form, userIdx]);

  return (
    <FormField
      control={form.control}
      name={`patients[${userIdx}].birthDate`}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Data urodzenia</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"secondary"}
                  className={cn(
                    "justify-between bg-transparent border-b-2 border-[#e8eaeb] rounded-none p-0",
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
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                locale={enGB}
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) => {
                  const today = new Date();
                  const minDate = new Date(today);
                  minDate.setFullYear(today.getFullYear() - 100);
                  return date < minDate || date > today;
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
