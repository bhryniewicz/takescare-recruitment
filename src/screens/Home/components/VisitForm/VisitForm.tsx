"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import { FormProvider, useForm } from "react-hook-form";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormSchema, FormValues } from "./schema";
import { VisitDetails } from "../VisitDetails";
import { PatientDetails } from "../PatientDetails";
import { ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import { FormNavigation } from "@/screens/Home/components/FormNavigation";

export const VisitForm = () => {
  const [_, setRefs] = useState<HTMLDivElement | null>(null);
  const visitRef = useRef<HTMLDivElement | null>(null);
  const patientRefs = useRef<(HTMLDivElement | null)[]>([]);

  const form = useForm<FormValues>({
    mode: "onSubmit",
    resolver: zodResolver(FormSchema),
    defaultValues: {
      patients: [
        {
          name: "",
          surname: "",
          pesel: "",
          street: "",
          streetAddress: "",
          birthDate: undefined,
        },
      ],
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <FormProvider {...form}>
      <div className="flex w-full">
        <div className="flex justify-center p-8 bg-[#f7f7f8] w-9/12">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="max-w-screen-lg space-y-6"
            >
              <VisitDetails ref={visitRef} />
              <PatientDetails setRefs={setRefs} patientRefs={patientRefs} />
              <Button className="w-full bg-[#0068fa] py-6" type="submit">
                Submit <ChevronRight />
              </Button>
            </form>
          </Form>
        </div>
        <FormNavigation patientRefs={patientRefs} visitRef={visitRef} />
      </div>
    </FormProvider>
  );
};
