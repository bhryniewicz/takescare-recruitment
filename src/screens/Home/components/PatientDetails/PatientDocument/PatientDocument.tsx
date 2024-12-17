import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FC, useState } from "react";
import { useFormContext } from "react-hook-form";

type PatientDocumentProps = {
  userIdx: number;
};

export const PatientDocument: FC<PatientDocumentProps> = ({ userIdx }) => {
  const [isPeselSelected, setIsPeselSelected] = useState(true);

  const { control, trigger, setValue } = useFormContext();

  const handleToggle = (field: string) => {
    setIsPeselSelected(field === "pesel");
  };

  return (
    <>
      <FormLabel>Dokument</FormLabel>
      <div className="flex gap-4 mb-4 p-2 rounded-lg bg-[#e5f0ff]">
        <Button
          variant={"secondary"}
          type="button"
          onClick={() => handleToggle("pesel")}
          className={`w-full ${
            isPeselSelected
              ? "bg-[#fefefe] text-[#242628]"
              : "bg-transparent text-[#6d7178]"
          }`}
        >
          PESEL
        </Button>
        <Button
          variant={"secondary"}
          type="button"
          onClick={() => handleToggle("passport")}
          className={`w-full ${
            !isPeselSelected
              ? "bg-[#fefefe] text-[#242628]"
              : "bg-transparent text-[#6d7178]"
          }`}
        >
          Paszport
        </Button>
      </div>
      <FormField
        control={control}
        name={`patients[${userIdx}].${isPeselSelected ? "pesel" : "passport"}`}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                placeholder={
                  isPeselSelected
                    ? "Wpisz numer PESEL"
                    : "Wpisz numer paszportu"
                }
                {...field}
                onChange={(e) => {
                  setValue(
                    `patients[${userIdx}].${
                      isPeselSelected ? "pesel" : "passport"
                    }`,
                    e.target.value
                  );
                  trigger(
                    `patients[${userIdx}].${
                      isPeselSelected ? "pesel" : "passport"
                    }`
                  );
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
