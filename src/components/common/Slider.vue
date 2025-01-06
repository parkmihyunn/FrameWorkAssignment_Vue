<script>
import { defineComponent } from "vue";
import { Carousel, Slide, Pagination } from "vue3-carousel";
import home_1 from "../../assets/img/carousel/img_shop_fashion.jpeg";
import home_2 from "../../assets/img/carousel/img_shop_digital.jpeg";
import home_3 from "../../assets/img/carousel/img_shop_grocery.jpeg";
import "vue3-carousel/dist/carousel.css";

export default defineComponent({
  name: "Autoplay",
  components: {
    Carousel,
    Slide,
    Pagination,
  },
  data() {
    return {
      slides: [
        {
          image: home_1,
          caption: "물빠진 청바지!",
          description: "이제 막 도착한 패션 청바지를 구경해 보세요.",
          link: "/fashion",
        },
        {
          image: home_2,
          caption: "신속한 업무처리!",
          description: "다양한 디지털 상품을 둘러보세요.",
          link: "/digital",
        },
        {
          image: home_3,
          caption: "신선한 식품!",
          description: "농장 직배송으로 더욱 신선한 식료품을 만나보세요.",
          link: "/grocery",
        },
      ],
    };
  },
});
</script>

<template>
  <div class="wrapper">
    <Carousel :autoplay="3000" :wrap-around="true">
      <Slide v-for="slide in slides" :key="slide">
        <div class="carousel__item">
          <div class="carousel-text">
            <h2 class="carousel-caption">
              {{ slide.caption }}
            </h2>
            <p class="carousel-description">{{ slide.description }}</p>
            <a v-bind:href="slide.link" class="arrow-btn">
              바로가기
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="arrow-svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
          <img class="slideImg" :src="slide.image" />
        </div>
      </Slide>
      <template #addons>
        <Pagination />
      </template>
    </Carousel>
  </div>
</template>

<style>
.wrapper,
.carousel__item {
  max-height: 244px;
}

.carousel-text {
  position: absolute;
  margin-bottom: 2.5rem;
  padding: 0 1rem;
  width: 100%;
  color: white;
  text-align: left;
  right: auto;
  left: auto;
  bottom: 0;
}

.carousel-caption {
  font-weight: 700;
  font-size: 1.5rem;
}

.carousel-description {
  margin: 0.5rem 0;
  font-weight: 500;
}

.arrow-btn {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 2rem;
  line-height: 1em;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  margin-top: 0.75rem;
  min-height: 2rem;
  font-size: 0.875rem;
  font-weight: 600;
  background-color: #3d4451;
  border-radius: 0.5rem;
}

.arrow-svg {
  width: 1.25rem;
  height: 1.25rem;
  margin-left: 0.25rem;
}

.carousel__pagination-button::after {
  background-color: #acacac;
  border-radius: 30%;
  width: 12px;
}
.carousel__pagination-button--active::after {
  background-color: #570df8;
  border-radius: 30%;
  width: 12px;
}

.carousel__pagination-button:hover::after {
  background-color: #acacac;
}
.carousel__pagination-button--active:hover::after {
  background-color: #570df8;
}
</style>
