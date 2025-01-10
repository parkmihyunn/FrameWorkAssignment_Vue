<script setup>
import { onMounted, ref } from "vue";
import { useDataStore } from "../../store/products";
import { useCart } from "../../store/cart";

let itemsArr = JSON.parse(window.localStorage.cart).items;
const idArr = [];
Object.entries(itemsArr).map((item) => idArr.push(item[0]));

const listArr = ref(JSON.parse(window.localStorage.cart).items);
const store = useDataStore();
let items = ref();
let totalPrice = ref(0);
let tempPrice = 0;

onMounted(async () => {
  await store.fetchContents();
  items.value = store.contents.filter(
    (item) => idArr.indexOf(String(item.id)) !== -1
  );
  for (let item of items.value) {
    tempPrice += Math.round(item.price) * itemsArr[item.id].count;
  }
  totalPrice.value = tempPrice;
});

const componentKey = ref(0);
const forceRerender = () => {
  componentKey.value += 1;
};
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("cart-btn")) {
    const beforeItemNum = Object.keys(itemsArr).length;
    listArr.value = JSON.parse(window.localStorage.cart).items;
    itemsArr = JSON.parse(window.localStorage.cart).items;
    items.value = store.contents.filter(
      (item) => idArr.indexOf(String(item.id)) !== -1
    );
    if (Object.keys(itemsArr).length !== beforeItemNum)
      window.location.reload();
    tempPrice = 0;
    for (let item of items.value) {
      tempPrice += Math.round(item.price) * itemsArr[item.id].count;
    }
    totalPrice.value = tempPrice;
    forceRerender();
  }
});

const cart = useCart();
</script>

<template>
  <div class="lg:flex lg:items-center justify-between mt-4 px-2 lg:px-0">
    <div v-for="el in items">
      <div class="mt-6 md:mt-14 px-2 lg:px-0">
        <div class="lg:flex justify-between mb-20">
          <div>
            <div class="lg:flex lg:items-center mt-4 px-2 lg:px-0">
              <a v-bind:href="`/product/${el.id}`">
                <figure
                  class="w-56 min-w-full flex-shrink-0 rounded-2xl overflow-hidden px-4 py-4 bg-white"
                >
                  <img
                    v-bind:src="`${items ? el.image : ``}`"
                    alt="사진"
                    class="object-contain w-full h-48"
                  />
                </figure>
              </a>
              <div class="card-body px-1 lg:px-12" :key="componentKey">
                <h2 class="card-title">
                  <a class="link link-hover" v-bind:href="`/product/${el.id}`">
                    {{ items ? el.title : "" }}
                  </a>
                </h2>
                <p class="mt-2 mb-4 text-3xl">
                  ${{
                    items ? listArr[el.id].count * Math.round(el.price) : ""
                  }}
                  <span class="text-2xl ml-2"
                    >(${{ items ? Math.round(el.price) : "" }})</span
                  >
                </p>
                <div class="card-actions">
                  <div class="btn-group">
                    <button
                      @click="cart.removeItem(cart.items, el.id)"
                      class="cart-btn btn btn-primary"
                    >
                      -
                    </button>
                    <button class="btn btn-ghost no-animation">
                      {{ listArr[el.id].count }}
                    </button>
                    <button
                      @click="cart.addItem(cart.items, el.id)"
                      class="cart-btn btn btn-primary"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="self-start shrink-0 flex items-center mt-10 mb-20">
      <span class="text-xl md:text-2xl" :key="componentKey"
        >총 : ${{ totalPrice }}</span
      >
      <label for="confirm-modal" class="modal-button btn btn-primary ml-5">
        구매하기
      </label>
    </div>
  </div>
</template>
