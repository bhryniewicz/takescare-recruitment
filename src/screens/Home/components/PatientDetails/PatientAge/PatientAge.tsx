import { isPatientAdult } from "@/utils/calculateAge";
import { FC } from "react";
import { useFormContext, useWatch } from "react-hook-form";

type PatientAgeProps = {
  userIdx: number;
};

export const PatientAge: FC<PatientAgeProps> = ({ userIdx }) => {
  const { control } = useFormContext();

  const birthDate = useWatch({
    control,
    name: `patients[${userIdx}].birthDate`,
  });

  const isAdult = birthDate instanceof Date ? isPatientAdult(birthDate) : false;

  return (
    <div className="flex gap-4">
      <div
        className={`w-1/2 p-4 text-center rounded-lg ${
          isAdult
            ? "bg-[#112950] text-white"
            : "bg-white text-[#09162a] border border-[#112950]"
        }`}
      >
        <p>Dorosly</p>
      </div>
      <div
        className={`w-1/2 p-4 text-center rounded-lg ${
          !isAdult
            ? "bg-[#112950] text-white"
            : "bg-white text-[#09162a] border border-[#112950]"
        }`}
      >
        <p>Dziecko</p>
      </div>
    </div>
  );
};
