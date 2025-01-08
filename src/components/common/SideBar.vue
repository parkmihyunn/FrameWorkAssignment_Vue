<script setup>
import { MENUS } from "../constants/category";
</script>

<template>
  <div
    className="side-bar-bg fixed flex w-screen h-screen top-0 left-0 bg-black/50"
  ></div>
  <div
    className="parent animate-fadein w-60 sm:w-80 p-4 h-screen absolute top-0 left-0 overflow-x-hidden bg-white dark:bg-slate-800"
  >
    <ul className="menu menu-item overflow-y-auto bg-white dark:bg-slate-800">
      <a
        v-for="el in category"
        :key="el"
        v-bind:href="`/${el[0]}`"
        className="menu-item hover:bg-gray-300 p-4 text-left text-gray-700 active:text-white dark:text-white active:bg-purple-600 rounded-md"
      >
        {{ el[1] }}
      </a>
    </ul>
  </div>
</template>

<script>
const category = Object.entries(MENUS);

const isClickedInside = (e) => {
  const $sideBarEl = document.querySelector(".sideBar-div");
  e.target.closest(".side-bar-bg") ? $sideBarEl.classList.add("hidden") : "";
};

const isClickedLink = (e) => {
  const $sideBarEl = document.querySelector(".menu");
  e.target.classList(".menu-item") ? $sideBarEl.classList.add("hidden") : "";
};

document.addEventListener("click", (e) => isClickedInside(e));
document.addEventListener("click", (e) => isClickedLink(e));
</script>
