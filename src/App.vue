<script setup>
import Nav from "./components/layout/Nav.vue";
import Footer from "./components/layout/Footer.vue";
</script>

<template>
  <Nav />
  <section
    class="drawer-content dark:bg-neutral flex flex-col justify-between h-[100vh]"
  >
    <section class="main pt-16 z-1">
      <router-view />
    </section>
    <Footer />
  </section>
</template>

<script>
export default {
  name: "App",
  components: {
    // HelloWorld,
  },
};
</script>
