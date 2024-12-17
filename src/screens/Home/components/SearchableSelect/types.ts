type SelectOption = {
  value: string;
  label: string;
};

type SelectCategory =
  | "specialization"
  | "language"
  | "visitType"
  | "topic"
  | "country"
  | "symptom"
  | "visitCountry";

export type SearchableSelectProps = {
  data: Array<SelectOption>;
  category: SelectCategory;
  controlName: string;
  isMultiSelect?: boolean;
};
