"use client";

import { FC } from "react";

type FormNavigationProps = {
  patientRefs: React.RefObject<(HTMLDivElement | null)[]>;
  visitRef: React.RefObject<HTMLElement | null>;
};

export const FormNavigation: FC<FormNavigationProps> = ({
  patientRefs,
  visitRef,
}) => {
  const scrollToSection = (index?: number) => {
    if (index !== undefined) {
      patientRefs.current[index]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    } else {
      visitRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <div className="flex flex-col items-start w-3/12 bg-[#f7f7f8] pt-12 rounded-md text-sm sticky top-0 h-screen overflow-auto">
      <button
        onClick={() => scrollToSection()}
        className="hover:underline mb-2"
      >
        Wizyta
      </button>
      <ul className="list-[upper-roman] pl-8">
        {patientRefs.current?.map((_, idx) => (
          <li key={idx} className="mb-2">
            <button
              onClick={() => scrollToSection(idx)}
              className="hover:underline"
            >
              Pacjent
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
