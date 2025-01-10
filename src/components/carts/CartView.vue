<script setup>
import CartList from "./CartList.vue";
import { onMounted, ref } from "vue";
import { useCart } from "../../store/cart";

const store = useCart();

const isEmpty = ref(true);
if (window.localStorage.cart === undefined) {
  isEmpty.value = true;
} else {
  JSON.stringify(JSON.parse(window.localStorage.cart).items) === "{}" ||
  JSON.stringify(JSON.parse(window.localStorage.cart).items) === "[]"
    ? (isEmpty.value = true)
    : (isEmpty.value = false);
}
console.log(JSON.stringify(JSON.parse(window.localStorage.cart).items));

const componentKey = ref(0);
const forceRerender = () => {
  componentKey.value += 1;
};
const removeAll = () => {
  store.removeAll();
  window.location.reload();
};
</script>

<template>
  <div class="text-sm breadcrumbs" :key="componentKey">
    <ul>
      <li>홈</li>
      <li>장바구니</li>
    </ul>
  </div>
  <div class="mt-6 md:mt-14 px-2 lg:px-0">
    <div v-if="isEmpty">
      <h1 class="text-2xl">장바구니에 물품이 없습니다.</h1>
      <a href="/" class="btn btn-primary mt-10 mb-20"> 담으러 가기 </a>
    </div>
    <CartList v-if="!isEmpty" />
  </div>
  <input type="checkbox" id="confirm-modal" class="modal-toggle" />

  <div class="modal">
    <div class="modal-box dark:bg-slate-700">
      <h3 class="font-bold text-lg">정말로 구매하시겠습니까?</h3>
      <p class="py-4">장바구니의 모든 상품들이 삭제됩니다.</p>
      <div class="modal-action">
        <label
          for="confirm-modal"
          class="btn btn-primary"
          @click="() => removeAll()"
        >
          네
        </label>
        <label for="confirm-modal" class="btn btn-outline dark:text-white">
          아니오
        </label>
      </div>
    </div>
  </div>
</template>

<script>
// export default {
//   data: () => {
//     return {};
//   },
//   methods: {
//     removeAll() {

//     }
//   },
// };
</script>
