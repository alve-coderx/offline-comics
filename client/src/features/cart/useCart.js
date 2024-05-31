import { useQuery } from "@tanstack/react-query";

export const getCartItems = () => {
  const cartItems =
    typeof window !== "undefined" && localStorage.getItem("cartItems")
      ? JSON.parse(
          typeof window !== "undefined" && localStorage.getItem("cartItems")
        )
      : [];
  return cartItems;
};

export const useCart = () => {
  return useQuery({
    queryKey: ["cartItems"],
    queryFn: getCartItems,
  });
};
