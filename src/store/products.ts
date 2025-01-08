import { defineStore } from "pinia";
import axios from "axios";

const productsURL = `${import.meta.env.VITE_FAKE_STORE_API}/products`;

export const useDataStore = defineStore("storeId", {
  state: () => ({
    contents: "",
  }),
  // 함수 정의하는 곳
  actions: {
    async fetchContents() {
      try {
        const { data } = await axios.get(productsURL); // 구조분해할당
        this.contents = data;
      } catch (err) {
        console.error("Fetch ERROR!", err);
      }
    },
  },
});
