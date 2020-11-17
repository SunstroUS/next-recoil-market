import { atom, selector } from "recoil";

const cartState = atom({
  key: "cartState",
  default: [],
});

const cartCountState = selector({
  key: "cartCountState",
  get: ({ get }) => {
    const cart = get(cartState);
    return cart.length;
  },
});

const cartTotalState = selector({
  key: "cartTotalState",
  get: ({ get }) => {
    const cart = get(cartState);
    if (cart.length === 0) return 0;
    if (cart.length === 1) return cart[0].price;
    return cart.reduce((subtotal, item) => ({
      price: item.price + subtotal.price,
    })).price;
  },
});

export { cartState, cartCountState, cartTotalState };
