export const extractDateFromPesel = (pesel: string) => {
    if (pesel.length !== 11) return null;

    const year = parseInt(pesel.substring(0, 2), 10);
    const month = parseInt(pesel.substring(2, 4), 10);
    const day = parseInt(pesel.substring(4, 6), 10);

    let fullYear;
    let adjustedMonth;

    if (month >= 1 && month <= 12) {
      fullYear = 1900 + year;
      adjustedMonth = month - 1;
    } else if (month >= 21 && month <= 32) {
      fullYear = 2000 + year;
      adjustedMonth = month - 21;
    } else if (month >= 81 && month <= 92) {
      fullYear = 1800 + year;
      adjustedMonth = month - 81;
    } else {
      return null;
    }

    return new Date(fullYear, adjustedMonth, day);
  };
