import { getPrice } from "@/utils/getPrice";

export const deleteCartItem = (item) => {
  const cartItems =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];
  console.log(cartItems);
  const itemToRemove = cartItems.find((i) => i.id === item.id);
  let updatedCartItems;
  if (itemToRemove) {
    updatedCartItems = cartItems.filter((i) => i.id !== itemToRemove.id);
    console.log("itemToRemove", updatedCartItems);
  } else {
    updatedCartItems = [...cartItems]; // Clone the original array
    console.log("a", updatedCartItems);
  }

  typeof window !== "undefined" &&
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
};
export const addItemToCart = (item) => {
  const existingCartItems =
    typeof window !== "undefined" && localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];

  const itemAlreadyHereIndex = existingCartItems.findIndex(
    (i) => i.id === item.id
  );

  if (itemAlreadyHereIndex !== -1) {
    // If the item is already in the cart, update its quantity
    existingCartItems[itemAlreadyHereIndex].quantity += item.quantity;
    existingCartItems[itemAlreadyHereIndex].subtotal =
      existingCartItems[itemAlreadyHereIndex].quantity *
      (item?.runprice
        ? item?.runprice
        : item?.runrate
        ? getPrice(item.price, item.runrate)
        : item.price);
  } else {
    // If the item is not in the cart, add it to the cart
    existingCartItems.push(item);
  }

  // Update the localStorage with the updated cart items
  localStorage.setItem("cartItems", JSON.stringify(existingCartItems));
};
export const emptyCart = () => {
  typeof window !== "undefined" && localStorage.setItem("cartItems", []);
};
export const updateCart = (array) => {
  typeof window !== "undefined" &&
    localStorage.setItem("cartItems", JSON.stringify(array));
};
export const increaseItemQuantity = (item) => {
  const existingCartItems =
    typeof window !== "undefined" && localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];

  const itemAlreadyHereIndex = existingCartItems.findIndex(
    (i) => i.id === item.id
  );

  if (itemAlreadyHereIndex !== -1) {
    // If the item is already in the cart, update its quantity
    existingCartItems[itemAlreadyHereIndex].quantity += 1;
    existingCartItems[itemAlreadyHereIndex].subtotal =
      existingCartItems[itemAlreadyHereIndex].quantity *
      (item?.runprice
        ? item?.runprice
        : item?.runrate
        ? getPrice(item.price, item.runrate)
        : item.price);
  } else {
    // If the item is not in the cart, add it to the cart
    existingCartItems.push(item);
  }

  // Update the localStorage with the updated cart items
  localStorage.setItem("cartItems", JSON.stringify(existingCartItems));
};
export const decreaseItemQuantity = (item) => {
  const existingCartItems =
    typeof window !== "undefined" && localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];

  const itemAlreadyHereIndex = existingCartItems.findIndex(
    (i) => i.id === item.id
  );

  if (itemAlreadyHereIndex !== -1) {
    // If the item is already in the cart, update its quantity
    existingCartItems[itemAlreadyHereIndex].quantity -= 1;
    existingCartItems[itemAlreadyHereIndex].subtotal =
      existingCartItems[itemAlreadyHereIndex].quantity *
      (item?.runprice
        ? item?.runprice
        : item?.runrate
        ? getPrice(item.price, item.runrate)
        : item.price);
  } else {
    // If the item is not in the cart, add it to the cart
    existingCartItems.push(item);
  }

  // Update the localStorage with the updated cart items
  localStorage.setItem("cartItems", JSON.stringify(existingCartItems));
};
