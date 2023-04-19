<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="carousel in carousel" :key="carousel.id">
        <img :src="carousel.imgUrl" />
        <div class="bg">
          <p>{{ carousel.word }}</p>
        </div>
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "CarouselCarousel",
  data() {
    return {
      carousel: [
        {
          imgUrl: require("../../assets/ai1.jpg"),
          // imgUrl: require("../../assets/swinging.png"),
          word: "博观而约取，厚积而薄发。",
          id: 1,
        },
        {
          // imgUrl: require("../../assets/skin2.jpeg"),
          imgUrl: require("../../assets/ai2.jpg"),
          word: "纸上得来终觉浅，绝知此事须躬行。",
          id: 2,
        },
        {
          imgUrl: require("../../assets/ai6.jpg"),
          word: "日拱一卒，功不唐捐。",
          id: 3,
        },
        {
          imgUrl: require("../../assets/ai5.jpg"),
          word: "靡不有初，鲜克有终。",
          id: 4,
        },
      ],
    };
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    list: {
      //为什么即使监听到数据变化了，还需要放入$nextTick？因为v-for渲染需要时间，在没有渲染完成之前，不能初始化swiper
      immediate: true,
      handler() {
        //只能监听到数据已经有了，但是v-for动态渲染结构我们还是没有办法确定的，因此还是需要用nextTick
        this.$nextTick(() => {
          // var mySwiper = new Swiper(this.$refs.cur, {
          new Swiper(this.$refs.cur, {
            loop: true,
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              //点击小球的时候也切换图片
              clickable: true,
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            // 自动轮播
            autoplay: {
              // delay: 2500,
              delay: 5500,
              disableOnInteraction: false,
            },
          });
        });
      },
    },
  },
};
</script>

<style  scoped>
img {
  width: 100%;
  /* height: calc(100%-8px); */
  height: 350px;
  transition: all ease 0.5s;
}

/* img:hover {
  transform: scale(1.2);
}
鼠标放上暂停滚动 */
p {
  color: #fff;
  font-size: 25px;
  /* text-shadow: 3px 2px red; */
  /* background-color: rgba(255, 255, 255, 0.5); */
  background-color: rgba(204, 204, 204, 0.7);
}
.bg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* filter: blur(1px); */
}
.swiper-button-prev,
.swiper-button-next {
  color: #fff;
}
</style>