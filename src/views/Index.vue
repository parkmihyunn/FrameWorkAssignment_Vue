<script setup>
import Slider from "../components/common/Slider.vue";
import ItemList from "../components/products/ItemList.vue";
</script>

<template>
  <Slider />
  <section
    class="pt-6 lg:pt-12 pb-4 lg:pb-8 px-4 xl:px-2 mt-10 xl:container mx-auto"
  >
    <ItemList category="fashion" isMain="true" />
  </section>
  <section class="pt-6 lg:pt-12 pb-4 lg:pb-8 px-4 xl:px-2 xl:container mx-auto">
    <ItemList category="accessory" isMain="true" />
  </section>
  <section
    class="pt-6 lg:pt-12 pb-4 lg:pb-8 px-4 xl:px-2 mb-20 xl:container mx-auto"
  >
    <ItemList category="digital" isMain="true" />
  </section>
</template>
