export function toPersianNumber(num) {
  if (num == null) return "";
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return num
    .toString()
    .split("")
    .map((c) => (/\d/.test(c) ? persianDigits[c] : c))
    .join("");
}

function convertToRial(dollarPrice, exchangeRate = 103) {
  const rialPrice = dollarPrice * exchangeRate;
  return rialPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export {toPersianNumber, convertToRial };
