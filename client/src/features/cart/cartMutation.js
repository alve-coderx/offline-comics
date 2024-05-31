import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addItemToCart,
  decreaseItemQuantity,
  deleteCartItem,
  emptyCart,
  increaseItemQuantity,
} from "./cart";
import { toast } from "sonner";

export function useDeleteCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (item) => deleteCartItem(item),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["cartItems"] });
        toast.error("Item removed", {
          position: "top-center",
        });
      }
    },
  });
}

export const useAddItemToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (item) => addItemToCart(item),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["cartItems"] });
        toast.success("Item added", {
          position: "top-center",
        });
      }
    },
  });
};
export const useEmptyCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: emptyCart,
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["cartItems"] });
        toast.warning("You'r cart is empty", {
          position: "top-center",
        });
      }
    },
  });
};
export const useIncreaseQuantity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (item) => increaseItemQuantity(item),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["cartItems"] });
        toast.info("Quantity increased", {
          position: "top-center",
        });
      }
    },
  });
};
export const useDecreaseQuantity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (item) => decreaseItemQuantity(item),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["cartItems"] });
        toast.info("Quantity increased", {
          position: "top-center",
        });
      }
    },
  });
};
