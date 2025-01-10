<script setup>
import { onMounted, ref } from "vue";
import { useDataStore } from "../store/products";
import { useCart } from "../store/cart";

let path = window.location.pathname.slice(9);

const componentKey = ref(0);
const forceRerender = () => {
  componentKey.value = 1;
};

const store = useDataStore();
const item = ref();
const category = ref();
const rate = ref(0);
const empty = ref(0);
const half = ref(false);

const cart = useCart();

onMounted(async () => {
  await store.fetchContents();
  item.value = store.contents[path - 1];
  if (
    store.contents[path - 1].category === "women's clothing" ||
    store.contents[path - 1].category === "men's clothing"
  ) {
    category.value = "패션";
  }
  if (store.contents[path - 1].category === "jewelery") {
    category.value = "액세서리";
  }
  if (store.contents[path - 1].category === "electronics") {
    category.value = "디지털";
  }

  Math.ceil(store.contents[path - 1].rating.rate) ===
  Math.round(store.contents[path - 1].rating.rate)
    ? (half.value = true)
    : "";

  rate.value = Math.floor(store.contents[path - 1].rating.rate);
  empty.value = 5 - Math.ceil(store.contents[path - 1].rating.rate);
  forceRerender();
});
</script>

<template>
  <section class="pt-4 lg:pt-5 pb-4 lg:pb-8 px-4 xl:px-2 xl:container mx-auto">
    <div class="text-sm breadcrumbs" :key="componentKey">
      <ul>
        <li>{{ category }}</li>
        <li>{{ item ? item.title : "" }}</li>
      </ul>
    </div>
    <article
      class="pt-2 lg:pt-4 pb-4 lg:pb-8 px-4 xl:px-2 mb-20 xl:container mx-auto"
    >
      <div class="lg:flex lg:items-center mt-6 md:mt-14 px-2 lg:px-0">
        <figure
          class="flex-shrink-0 rounded-2xl overflow-hidden px-4 py-4 bg-white view_image"
        >
          <img
            v-bind:src="`${item ? item.image : ``}`"
            alt="사진"
            class="object-contain w-full h-72"
          />
        </figure>
        <div class="card-body px-1 lg:px-12">
          <h2 class="card-title">
            {{ item ? item.title : "..." }}
            <span
              class="badge badge-accent bg-[#37cdbe] border-[#37cdbe] ml-2 text-white dark:text-white"
            >
              NEW
            </span>
          </h2>
          <p>{{ item ? item.description : "" }}</p>
          <div class="flex items-center mt-3">
            <div class="rating rating-half">
              <div v-for="el in [...Array(rate)]" :key="el">
                <input
                  type="radio"
                  name="rating-10"
                  class="bg-yellow-400 cursor-default mask mask-star-2 mask-half-1"
                  disabled
                  checked
                />
                <input
                  type="radio"
                  name="rating-10"
                  class="bg-yellow-400 cursor-default mask mask-star-2 mask-half-2"
                  disabled
                  checked
                />
              </div>
              <div v-if="half">
                <input
                  type="radio"
                  name="rating-10"
                  class="bg-yellow-400 cursor-default mask mask-star-2 mask-half-1"
                  disabled
                  checked
                />
                <input
                  type="radio"
                  name="rating-10"
                  class="bg-yellow-400 cursor-default mask mask-star-2 mask-half-2"
                  disabled
                />
              </div>
              <div v-if="!half">
                <input
                  type="radio"
                  name="rating-10"
                  class="bg-[#facc1533] cursor-default mask mask-star-2 mask-half-1"
                  disabled
                />
                <input
                  type="radio"
                  name="rating-10"
                  class="bg-[#facc1533] cursor-default mask mask-star-2 mask-half-2"
                  disabled
                />
              </div>
              <div v-for="el in [...Array(empty)]">
                <input
                  type="radio"
                  name="rating-10"
                  class="bg-[#facc1533] cursor-default mask mask-star-2 mask-half-1"
                  disabled
                />
                <input
                  type="radio"
                  name="rating-10"
                  class="bg-[#facc1533] cursor-default mask mask-star-2 mask-half-2"
                  disabled
                />
              </div>
            </div>
            <div class="ml-2">
              {{ item ? item.rating.rate : "" }} /
              {{ item ? item.rating.count : "" }} 참여
            </div>
          </div>
          <p class="mt-2 mb-4 text-3xl">
            ${{ item ? Math.round(item.price) : "" }}
          </p>
          <div class="card-actions">
            <button
              class="add-cart btn btn-primary"
              @click="cart.addItem(cart.items, item.id)"
            >
              장바구니에 담기
            </button>
            <a href="/cart" class="btn btn-outline ml-1 dark:text-white">
              장바구니로 이동
            </a>
          </div>
        </div>
      </div>
    </article>
  </section>
</template>
