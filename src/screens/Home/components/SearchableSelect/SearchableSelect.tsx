"use client";

import { cn } from "@/lib/utils";
import { Check, ChevronDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
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
import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";
import React, { FC } from "react";
import { SearchableSelectProps } from "./types";

export const SearchableSelect: FC<SearchableSelectProps> = ({
  category,
  data,
  controlName,
  isMultiSelect = false,
}) => {
  const { watch, setValue, trigger, control } = useFormContext();

  const categoryLabel =
    category === "specialization"
      ? "Specjalizacja"
      : category === "language"
      ? "Język wizyty"
      : category === "topic"
      ? "Temat"
      : category === "symptom"
      ? "Objawy (opcjonalnie)"
      : category === "visitType"
      ? "Rodzaj wizyty"
      : "";

  const selectedValues = watch(controlName) || (isMultiSelect ? [] : "");

  const toggleValue = (value: string) => {
    if (isMultiSelect) {
      const updatedValues = selectedValues.includes(value)
        ? selectedValues.filter((item: string) => item !== value)
        : [...selectedValues, value];
      setValue(controlName, updatedValues);
      trigger(controlName);
    } else {
      setValue(controlName, value);
      trigger(controlName);
    }
  };

  const getSelectedLabel = () => {
    if (isMultiSelect) {
      return selectedValues.length > 0
        ? selectedValues
            .map(
              (value: string) =>
                data.find((item) => item.value === value)?.label
            )
            .join(", ")
        : "Wybierz z listy";
    } else {
      return (
        data.find((item) => item.value === selectedValues)?.label ||
        (category === "country" || category === "visitCountry"
          ? "Kraj"
          : "Wybierz z listy")
      );
    }
  };

  return (
    <FormField
      control={control}
      name={controlName}
      render={() => (
        <FormItem className="flex flex-col">
          {category !== "country" && <FormLabel>{categoryLabel}</FormLabel>}
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="secondary"
                  role="combobox"
                  className={cn(
                    "w-[635px] justify-between bg-transparent border-b-2 border-[#e8eaeb] rounded-none p-0",
                    !selectedValues.length && "text-muted-foreground"
                  )}
                >
                  {getSelectedLabel()}
                  <ChevronDown className="opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Szukaj..." className="h-9" />
                <CommandList>
                  <CommandEmpty>Brak wyników.</CommandEmpty>
                  <CommandGroup>
                    {data.map((item) => (
                      <CommandItem
                        key={item.value}
                        value={item.label}
                        onSelect={() => toggleValue(item.value)}
                      >
                        <div className="flex items-center">
                          <Check
                            className={cn(
                              "mr-2",
                              isMultiSelect
                                ? selectedValues.includes(item.value)
                                  ? "opacity-100"
                                  : "opacity-0"
                                : item.value === selectedValues
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {item.label}
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
