export const parseValue = value => parseFloat(value) || 0;

export const calculateLineItemTotal = lineItem => {
  if (!lineItem) return 0;

  const unitCost = parseValue(lineItem.unitCost);
  const quantity = parseValue(lineItem.quantity);
  return unitCost * quantity;
};

export const calculateSubTotal = lineItems =>
  lineItems.reduce(
    (sum, lineItem) => sum + calculateLineItemTotal(lineItem),
    0,
  );

export const calculateTax = (subTotal, taxRate) =>
  subTotal * (parseValue(taxRate) / 100);

export const calculateTotal = (subTotal, taxRate) =>
  subTotal + calculateTax(subTotal, taxRate);
