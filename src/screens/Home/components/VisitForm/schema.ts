import { z } from "zod";

const patientSchema = z.object({
  name: z
    .string({
      required_error: "Podaj imię",
    })
    .min(1, "Podaj imię"),
  surname: z.string().min(1, "Podaj nazwisko"),
  street: z.string().min(1, "Podaj ulicę"),
  streetAddress: z.string().min(1, "Podaj numer lokalu"),
  visitCountry: z.string().optional(),
  visitStreet: z.string().optional(),
  visitStreetAddress: z.string().optional(),
  symptoms: z.array(z.string()).optional(),
  pesel: z
    .string()
    .length(11, "PESEL musi mieć dokładnie 11 cyfr")
    .regex(/^\d+$/, "PESEL może zawierać tylko cyfry")
    .optional(),
  passport: z.string().optional(),
  country: z.string({
    required_error: "Wybierz kraj",
  }),
  birthDate: z.date({
    required_error: "Wiek pacjenta jest wymagany",
  }),
});

export const FormSchema = z.object({
  specialization: z.string({
    required_error: "Wybierz specjalizacje",
  }),
  visitType: z.string({
    required_error: "Wybierz typ wizyty",
  }),
  topic: z.string({
    required_error: "Wybierz temat",
  }),
  language: z.string({
    required_error: "Wybierz język",
  }),
  visitDate: z.date({
    required_error: "Data wizyty jest wymagana",
  }),
  time: z
    .object({
      from: z.number(),
      to: z.number(),
    })
    .optional(),
  patients: z.array(patientSchema),
});

export type FormValues = z.infer<typeof FormSchema>;
