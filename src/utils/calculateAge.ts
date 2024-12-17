export const isPatientAdult = (birthDate: Date | undefined) => {
  if (!birthDate) return false;
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    return age >= 18;
  }

  return age >= 18;
};
