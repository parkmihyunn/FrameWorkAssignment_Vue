<script setup>
import SideBar from "../common/SideBar.vue";
import { MENUS } from "../constants/category";
import { reactive } from "vue";
import { useDataStore } from "../../store/products";
import { onMounted, ref } from "vue";

const store = useDataStore();
let contents;
let search = ref(false);

const componentKey = ref(0);
const forceRerender = () => {
  componentKey.value += 1;
};

const cartCount = ref(0);
document.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("cart-btn") ||
    e.target.classList.contains("add-cart")
  ) {
    cartCount.value = Object.keys(
      JSON.parse(window.localStorage.cart).items
    ).reduce(
      (acc, cur) =>
        (acc += JSON.parse(window.localStorage.cart).items[cur].count),
      0
    );
    forceRerender();
  }
});

if (window.localStorage.cart !== undefined) {
  cartCount.value = Object.keys(
    JSON.parse(window.localStorage.cart).items
  ).reduce(
    (acc, cur) =>
      (acc += JSON.parse(window.localStorage.cart).items[cur].count),
    0
  );
}

onMounted(async () => {
  await store.fetchContents();
  contents = store.contents;
});

const filteredSearch = ref([]);
const onChange = (event) => {
  console.log(event.target.value);
  if (event.target.value === "") {
    search.value = false;
  } else {
    search.value = true;
    filteredSearch.value = contents.filter((product) =>
      product.title.toLowerCase().includes(event.target.value.toLowerCase())
    );
  }
};
</script>

<template>
  <div
    class="z-[999] fixed flex items-center justify-between w-full bg-white dark:bg-[#191d24] dark:text-white h-16 px-4 whitespace-nowrap drop-shadow-lg"
  >
    <div class="flex items-center">
      <div
        class="hamburger rounded-md hover:bg-gray-300 hover:transition-all hover:duration-300"
      >
        <button class="w-6 m-2 hamburger" type="button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="hamburger"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              class="hamburger"
            />
          </svg>
        </button>
      </div>
      <div class="sideBar-div hidden">
        <SideBar />
      </div>
      <a href="/" class="m-2 mr-4 font-bold text-lg">
        <h1>Vue Shop</h1>
      </a>
      <a
        v-for="el in category"
        :key="el"
        v-bind:href="`/${el[0]}`"
        class="hidden md:block px-3 py-1 rounded-md font-bold hover:bg-gray-300 hover:transition-all hover:duration-300"
      >
        {{ el[1] }}
      </a>
    </div>
    <div class="mode-btn flex items-center">
      <button @click="changeMode" class="w-6 h-6 mr-4">
        <svg
          v-if="dark"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
          />
        </svg>
        <svg
          v-if="!dark"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
          />
        </svg>
      </button>
      <div class="">
        <div class="min-[530px]:hidden flex">
          <button @click="openSearch" class="searchIcon w-6 h-6 mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="searchIcon min-[530px]:hidden"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                class="searchIcon"
              />
            </svg>
          </button>
        </div>
        <input
          type="text"
          placeholder="검색"
          class="hidden-search hidden min-[530px]:hidden absolute left-0 top-[63px] focus:outline-0 p-2 rounded-md bg-gray-300 dark:bg-gray-600 !text-gray-800 dark:!text-white w-full"
          @input="onChange($event)"
        />
        <input
          type="text"
          placeholder="검색"
          class="hidden min-[530px]:block focus:outline-0 m-2 p-2 rounded-md bg-gray-300 dark:bg-gray-600 !text-gray-800 dark:!text-white"
          @input="onChange($event)"
        />
        <ul
          class="!fixed overflow-y-scroll overflow-visible max-[530px]:!top-[102px] !top-[60px] max-[530px]:w-full max-[530px]:left-0 menu flex-nowrap max-h-96 shadow text-base-content overflow-y-scroll bg-white dark:bg-gray-600"
          :key="componentKey"
        >
          <li
            v-if="search"
            v-for="el in filteredSearch"
            :key="el"
            class="!block"
          >
            <a v-bind:href="`/product/${el.id}`">
              <div
                class="!block text-gray-600 dark:text-white w-[248px] max-[530px]:w-full text-left whitespace-normal"
              >
                {{ el.title }}
              </div>
            </a>
          </li>
        </ul>
      </div>

      <a
        href="/cart"
        class="p-1.5 rounded-md hover:bg-gray-300 hover:transition-all hover:duration-300"
      >
        <div
          class="cart-icon items-center justify-center text-white text-xs"
          :key="componentKey"
        >
          {{ cartCount }}
        </div>
        <div class="w-7 h-7">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
const category = Object.entries(MENUS);

document.addEventListener("click", (e) => isClickedHamburger(e));
const isClickedHamburger = (e) => {
  const $sideBarEl = document.querySelector(".sideBar-div");
  e.target.classList.contains("hamburger")
    ? $sideBarEl.classList.remove("hidden")
    : "";
};

document.addEventListener("click", (e) => openSearch(e));
const openSearch = (e) => {
  const $searchEl = document.querySelector(".hidden-search");
  e.target.classList.contains("searchIcon")
    ? $searchEl.classList.remove("hidden")
    : "";
};

export default {
  data: () => {
    return {
      dark: reactive(localStorage.getItem("dark")),
    };
  },
  methods: {
    changeMode() {
      const $htmlEl = document.querySelector("html");
      $htmlEl.classList.toggle("dark");
      if (window.localStorage.getItem("dark") === "true") {
        this.dark = false;
        window.localStorage.setItem("dark", "false");
      } else {
        this.dark = true;
        window.localStorage.setItem("dark", "true");
      }
    },
    handleSearchInput(e) {
      this.search = e.target.value;

      if (this.search.length !== 0) {
        const filteredList = this.contents.filter((item) =>
          item.title.includes(this.search)
        );
        this.searchList = filteredList;
      }
    },
  },
};
</script>
