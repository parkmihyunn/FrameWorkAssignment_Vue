<script setup>
import Nav from "./components/layout/Nav.vue";
import Footer from "./components/layout/Footer.vue";

const $htmlEl = document.querySelector("html");
if (localStorage.getItem("dark") === "true") {
  $htmlEl.classList.add("dark");
}
if (localStorage.getItem("dark") === "false") {
  $htmlEl.classList.remove("dark");
}
</script>

<template>
  <Nav></Nav>
  <section
    class="drawer-content dark:bg-neutral flex flex-col justify-between h-full"
  >
    <section class="main pt-16 z-1">
      <router-view />
    </section>
  </section>
  <Footer></Footer>
</template>

<script>
export default {
  name: "NavComponent",
  components: {
    Nav,
  },
  name: "FooterComponent",
  components: {
    Footer,
  },
};
</script>
