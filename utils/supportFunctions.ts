export function convertToDecimal(
  val: number,
  decimal: number,
  precision: number
): string {
  const factor = Math.pow(10, decimal);
  const decimalValue = val / factor;
  return decimalValue.toFixed(precision);
}
export const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};
export function padAmount(amount: number, decimals: number): string {
  const multiplier = Math.pow(10, decimals);
  const paddedAmount = amount * multiplier;
  return paddedAmount.toString();
}
