<script setup>

  import { defineProps, onMounted, ref } from 'vue';
  import { useDataStore } from "../../store/products";
  
  const props = defineProps({
    category: String
  });
  
  let main;
  window.location.pathname === '/' ? main = true : main = false;

  const store = useDataStore();
  const items = ref();

  const componentKey = ref(0);
  const forceRerender = () => {
    componentKey.value = 1;
  };

  onMounted(async () => {
    await store.fetchContents();
    if(props.category==="패션") {
      if(main) {
        items.value = store.contents.filter(
          (product) =>
          product.category === "women's clothing" ||
          product.category === "men's clothing"
        ).slice(0,4);
      }
      else {
        items.value = store.contents.filter(
          (product) =>
            product.category === "women's clothing" ||
            product.category === "men's clothing"
        );
      }
    }
    if(props.category==="액세서리") {
      if(main) {
        items.value = store.contents.filter(
          (product) => product.category === "jewelery"
        ).slice(0,4);
      }
      else {
        items.value = store.contents.filter(
          (product) => product.category === "jewelery"
        );
      }
    }
    if(props.category==="디지털") {
      if(main) {
        items.value = store.contents.filter(
          (product) => product.category === "electronics"
        ).slice(0,4);
      }
      else {
        items.value = store.contents.filter(
          (product) => product.category === "electronics"
        );
      }
    }
    forceRerender();
  });

</script>

<template :key="componentKey">
  <h2 class="mb-5 lg:mb-8 text-3xl lg:text-4xl text-center font-bold">{{category}}</h2>
  <div class="cards-wrapper grid grid-cols-4 overflow-x-scroll gap-64 md:gap-6 md:overflow-x-hidden md:grid-cols-2 lg:grid-cols-4 item_list">
    <a
      v-if="main"
      v-for="el in items"
      v-bind:href="`/product/${el.id}`"
      class="card card-bordered border-gray-200 dark:border-gray-800 card-compact lg:card-normal min-w-[230px]"
    >
      <figure class="flex h-80 bg-white overflow-hidden">
        <img
          class="hover:scale-125 transition-transform duration-300 w-[109px]"
          v-bind:src="`${el.image ? el.image : ``}`"
          alt="image"
        ></img>
      </figure>
      <div class="card-body bg-gray-100 dark:bg-gray-700">
        <h3 class="card-title text-base">{{el.title}}</h3>
        <p class="text-base">${{Math.round(el.price)}}</p>
      </div>
    </a>
    <a v-if="!main"
      v-for="el in items" :key="el"
      v-bind:href="`/product/${el.id}`"
      class="card card-bordered border-gray-200 dark:border-gray-800 card-compact lg:card-normal min-w-[230px]"
    >
      <figure class="flex h-80 bg-white overflow-hidden">
        <img
          class="hover:scale-125 transition-transform duration-300 w-[109px]"
          v-bind:src="`${el.image ? el.image : ``}`"
          alt="image"
        ></img>
      </figure>
      <div class="card-body bg-gray-100 dark:bg-gray-700">
        <h3 class="card-title text-base">{{el.title}}</h3>
        <p class="text-base">{{Math.round(el.price)}}</p>
      </div>
    </a>
  </div>
</template>