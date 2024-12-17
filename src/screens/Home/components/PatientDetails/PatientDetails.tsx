"use client";

import { FC } from "react";
import { BirthDatePicker } from "./PatientBirthDatePicker";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SearchableSelect } from "@/screens/Home/components/SearchableSelect";
import { symptoms } from "@/data/mockData";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { PatientAge } from "./PatientAge/PatientAge";
import { PatientDocument } from "./PatientDocument";
import { PatientVisitAddress } from "./PatientVisitAddress";

const MAX_PATIENTS = 6;

type PatientDetailsProps = {
  patientRefs: React.RefObject<(HTMLDivElement | null)[]>;
  setRefs: (value: HTMLDivElement | null) => void;
};

export const PatientDetails: FC<PatientDetailsProps> = ({
  patientRefs,
  setRefs,
}) => {
  const { control } = useFormContext();
  const { fields, append } = useFieldArray({
    control,
    name: "patients",
  });

  const handleAddNewPatient = () => {
    append({
      name: "",
      surname: "",
      pesel: "",
      street: "",
      streetAddress: "",
    });
  };

  return (
    <>
      {fields.map((field, idx) => (
        <div
          key={field.id}
          ref={(el) => {
            patientRefs.current[idx] = el;
            setRefs(el);
          }}
          className="flex flex-col gap-4 bg-[#fefefe] p-10 rounded-md border-2 border-[#f1f1f2]"
        >
          <h3 className="text-3xl font-extralight text-[#586985]">Pacjent</h3>
          <FormLabel>Wiek pacjenta</FormLabel>
          <PatientAge userIdx={idx} />
          <FormLabel>Dane pacjenta</FormLabel>
          <div className="flex gap-4">
            <FormField
              control={control}
              name={`patients[${idx}].name`}
              render={({ field }) => (
                <FormItem className="w-6/12">
                  <FormControl>
                    <Input placeholder="Imię" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`patients[${idx}].surname`}
              render={({ field }) => (
                <FormItem className="w-6/12">
                  <FormControl>
                    <Input placeholder="Nazwisko" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <SearchableSelect
            data={symptoms}
            category="symptom"
            controlName={`patients[${idx}].symptoms`}
            isMultiSelect
          />
          <PatientDocument userIdx={idx} />
          <PatientVisitAddress userIdx={idx} />
          <BirthDatePicker userIdx={idx} />
        </div>
      ))}
      <Button
        variant={"outline"}
        className="w-full bg-[#fefefe] py-6 border border-[#0068fa] text-[#0068fa]"
        type="button"
        onClick={handleAddNewPatient}
        disabled={fields.length >= MAX_PATIENTS}
      >
        Dodaj pacjenta
      </Button>
    </>
  );
};
