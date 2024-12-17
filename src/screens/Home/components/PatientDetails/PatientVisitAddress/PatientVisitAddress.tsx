import { Checkbox } from "@/components/ui/checkbox";
import { countries } from "@/data/mockData";
import { FC, useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SearchableSelect } from "@/screens/Home/components/SearchableSelect";

type PatientVisitAddressProps = {
  userIdx: number;
};

export const PatientVisitAddress: FC<PatientVisitAddressProps> = ({
  userIdx,
}) => {
  const [isVisitAddressOpen, setIsVisitAddressOpen] = useState<boolean>(false);
  const { control } = useFormContext();

  if (userIdx !== 0) return null;

  return (
    <>
      <FormLabel>Dane Adresowe</FormLabel>
      <SearchableSelect
        data={countries}
        category="country"
        controlName={`patients[${userIdx}].country`}
      />

      <div className="flex gap-4">
        <FormField
          control={control}
          name={`patients[${userIdx}].street`}
          render={({ field }) => (
            <FormItem className="w-8/12">
              <FormControl>
                <Input placeholder="Ulica" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={`patients[${userIdx}].streetAddress`}
          render={({ field }) => (
            <FormItem className="w-4/12">
              <FormControl>
                <Input placeholder="Nr lokalu" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`terms-${userIdx}`}
          onCheckedChange={() => setIsVisitAddressOpen((prev) => !prev)}
        />
        <label
          htmlFor={`terms-${userIdx}`}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Wizyta ma się odbyć na inny adres
        </label>
      </div>
      {isVisitAddressOpen && (
        <>
          <FormLabel>Dane Adresowe do wizyty</FormLabel>
          <SearchableSelect
            data={countries}
            category="visitCountry"
            controlName={`patients[${userIdx}].visitCountry`}
          />
          <div className="flex gap-4">
            <FormField
              control={control}
              name={`patients[${userIdx}].visitStreet`}
              render={({ field }) => (
                <FormItem className="w-8/12">
                  <FormControl>
                    <Input placeholder="Ulica" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`patients[${userIdx}].visitStreetAddress`}
              render={({ field }) => (
                <FormItem className="w-4/12">
                  <FormControl>
                    <Input placeholder="Nr lokalu" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </>
      )}
    </>
  );
};
