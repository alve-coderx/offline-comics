export const getPrice = (price, discountPercentage) => {
  if (price < 0 || discountPercentage < 0 || discountPercentage > 100) {
    return "Invalid input"; // Handle invalid input
  }

  const discountAmount = (price * discountPercentage) / 100;
  const discountedPrice = Math.floor(price - discountAmount);
  return discountedPrice;
};
