<script setup>
import ItemList from "../components/products/ItemList.vue";
</script>

<template>
  <section
    className="pt-4 lg:pt-5 pb-4 lg:pb-8 px-4 xl:px-2 xl:container mx-auto"
  >
    <div className="text-sm breadcrumbs">
      <ul>
        <li>홈</li>
        <li>디지털</li>
      </ul>
    </div>
    <article
      className="pt-2 lg:pt-4 pb-4 lg:pb-8 px-4 xl:px-2 mb-20 xl:container mx-auto"
    >
      <ItemList :category="`디지털`" />
    </article>
  </section>
</template>
