import { defineStore } from "pinia";

export const useCart = defineStore("cart", {
  state: () => ({
    items: [],
  }),
  actions: {
    addItem(items, id) {
      window.localStorage.setItem(
        "totalCount",
        `${Number(window.localStorage.getItem("totalCount")) + 1}`
      );
      console.log(items);
      const tempCart = { ...items };
      if (tempCart[id] === undefined) {
        tempCart[id] = { id: id, count: 1 };
        this.items = tempCart;
      } else {
        this.items = {
          ...tempCart,
          [id]: { id: id, count: this.items[id].count + 1 },
        };
      }
      console.log(window.localStorage.cart);
    },
    removeItem(items, id) {
      if (window.localStorage.getItem("totalCount")) {
        window.localStorage.setItem(
          "totalCount",
          `${Number(window.localStorage.getItem("totalCount")) - 1}`
        );
      }
      const tempCart = { ...items };
      if (tempCart[id].count === 1) {
        delete tempCart[id];
        this.items = tempCart;
      } else {
        this.items = {
          ...tempCart,
          [id]: { id: id, count: items[id].count - 1 },
        };
      }
    },
    cartCounts() {
      const tempCart = { ...this.items };
      const count = Object.keys(tempCart).reduce(
        (acc, cur) => (acc += tempCart[cur].count),
        0
      );
      console.log(count);
      return count;
    },
    removeAll() {
      const tempCart = {};
      this.items = tempCart;
      window.localStorage.setItem("totalCount", "0");
    },
  },
  persist: true,
});
