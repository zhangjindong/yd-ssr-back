<template>
  <div class="widget-header">
        <div class="banner">
            <div class="ucenter w128">
                <div class="logo pull-left">
                    <a class="logo__a" href="/">
                        <img id="logo" alt="一灯学堂" width="226px" height="48px" src="" />
                    </a>
                </div>
                <div class="box bg-1">
                    <a href="/index.html" class="button button--wapasha button-color button--round-s">首页</a>
                    <a href="/bookDesk" class="button button--book button--round-s">图书馆</a>
                   <a href="/student" class="button button--student button--round-s">简历填写</a>
                </div>
                <div class="pull-right">
                    <a href="javascript:alert('成就系统即将开放，敬请期待~')" target="_blank">
                        <img alt="我的小树" width="38px" title="我的成就" src="" class="greentree" id="js-greentree">
                    </a>
                    <img :src="userInfo.avatar" class="face">
                    <span class="title">{{userInfo.nick}}</span>
                    <a href="http://www.yidengxuetang.com/users/login">退出登录</a>
                </div>
            </div>
        </div>
        <div class="clearfix"></div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
// const fetchInitialData = ({ store }) => {
//   return store.dispatch("getUserInfo");
// };

export default {
  // name: "UserInfo",
  // asyncData: fetchInitialData,
  computed: {
    ...mapGetters({
      userInfo: "getUserInfo"
    })
  },
  methods: {
    init() {
      const _logo = require("./images/logo.png");
      const _greentree = require("./images/greentree.png");
      document.getElementById("logo").src = _logo;
      document.getElementById("js-greentree").src = _greentree;
    }
  },
  mounted() {
    this.init();
    // fetchInitialData({ store: this.$store });
  }
};
</script>

<style scoped>
/* 自定义配置全局类 */
@import "./styles/headerbase.css";

:root {
  --height: 70px;
  --transition-timing: cubic-bezier(0.75, 0, 0.125, 1);
  --transition-trans: {
    transform: scale3d(0.6, 0.6, 1);
    transition: transform 0.3s, opacity 0.3s;
    transition-timing-function: var(--transition-timing);
  }
}

@-webkit-keyframes bounceOutUp {
  0% {
    -webkit-transform: translateY(0);
  }

  20% {
    opacity: 1;
    -webkit-transform: translateY(20px);
  }

  100% {
    opacity: 0;
    -webkit-transform: translateY(-2000px);
  }
}

@-moz-keyframes bounceOutUp {
  0% {
    -moz-transform: translateY(0);
  }

  20% {
    opacity: 1;
    -moz-transform: translateY(20px);
  }

  100% {
    opacity: 0;
    -moz-transform: translateY(-2000px);
  }
}

@-webkit-keyframes swing {
  20%,
  40%,
  60%,
  80%,
  100% {
    -webkit-transform-origin: bottom center;
  }

  20% {
    -webkit-transform: rotate(15deg);
  }

  40% {
    -webkit-transform: rotate(-10deg);
  }

  60% {
    -webkit-transform: rotate(5deg);
  }

  80% {
    -webkit-transform: rotate(-5deg);
  }

  100% {
    -webkit-transform: rotate(0deg);
  }
}

@-moz-keyframes swing {
  20%,
  40%,
  60%,
  80%,
  100% {
    -moz-transform-origin: bottom center;
  }

  20% {
    -moz-transform: rotate(15deg);
  }

  40% {
    -moz-transform: rotate(-10deg);
  }

  60% {
    -moz-transform: rotate(5deg);
  }

  80% {
    -moz-transform: rotate(-5deg);
  }

  100% {
    -moz-transform: rotate(0deg);
  }
}

/* 全局类结束 */
.widget-header {
  .banner {
    background: #fff;
    -webkit-box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2);
  }

  .ucenter {
    height: 70px;
    line-height: 70px;
    padding-right: 20px;
    overflow: hidden;
  }

  .face {
    height: 36px;
    width: 36px;
    border-radius: 18px;
    display: inline-block;
    vertical-align: middle;
  }

  .title {
    color: #a09b9b;
  }

  .logo__a {
    display: block;
    margin: 0;
    padding: 0;
    border: none;
    outline: none;
  }

  .greentree {
    cursor: pointer;
    -webkit-animation: swing 1s 0.2s ease both infinite;
    -moz-animation: swing 1s 0.2s ease both infinite;
    margin-right: 10px;
  }
}

.button.button--wapasha {
  background: #4cb0f9;
  color: #fff;
  transition: background-color 0.3s, color 0.3s;
}

.button--inverted {
  background: #fff;
  color: #37474f;
}

.button--inverted::before {
  border-color: #7986cb;
}

.button--wapasha::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 2px solid #4cb0f9;
  z-index: -1;
  border-radius: inherit;
  opacity: 0;

  @apply (--transition-trans);
}

.button--wapasha:hover {
  background-color: #fff;
  color: #000;
}

.button--wapasha.button--inverted:hover {
  background-color: #37474f;
  color: #7986cb;
}

.button--wapasha:hover::before {
  transform: scale3d(1, 1, 1);
  opacity: 1;
}

.button--round-s.button--quidel::after {
  border-radius: 3px;
}

.button--ujarak.button--round-s::before {
  border-radius: 2px;
}

.button--round-s {
  border-radius: 5px;
}

.bg-1 {
  background: #eceff1;
  color: #37474f;
}

.bg-2 {
  background: #7986cb;
  color: #eceff1;
}

.bg-3 {
  background: #37474f;
  color: #fff;
}

/* Common button styles */

.button {
  float: left;
  width: 100px;
  height: 40px;
  line-height: 40px;
  display: block;
  margin: 1em;
  border: none;
  background: none;
  color: inherit;
  vertical-align: middle;
  position: relative;
  z-index: 1;
  -webkit-backface-visibility: hidden;
  -moz-osx-font-smoothing: grayscale;
}

.button:focus {
  outline: none;
}

.button > span {
  vertical-align: middle;
}

/* Text color adjustments (we could stick to the "inherit" but that does not work well in Safari) */

.bg-1 .button {
  text-decoration: none;
  text-align: center;
  border-color: #37474f;
}

.button.button--wapashas {
  background: #fec04e;
  color: #fff !;
  transition: background-color 0.3s, color 0.3s;
}

.button--wapashas {
  .button--inverted {
    background: #fff;
    color: #37474f;
  }

  .button--inverted::before {
    border-color: #7986cb;
  }
}

.button--wapashas::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 2px solid #fec04e;
  z-index: -1;
  border-radius: inherit;
  opacity: 0;

  @apply (--transition-trans);
}

.button--wapashas:hover {
  background-color: #fff;
  color: #000 !important;
}

.button--wapashas.button--inverted:hover {
  background-color: #37474f;
  color: #7986cb;
}

.button--wapashas:hover::before {
  transform: scale3d(1, 1, 1);
  opacity: 1;
}

/* book */

.button.button--student {
  background: #a49ef0;
  color: #fff;
  transition: background-color 0.3s, color 0.3s;
}

.button--student {
  .button--inverted {
    background: #fff;
    color: #37474f;
  }

  .button--inverted::before {
    border-color: #7986cb;
  }
}

.button--student::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 2px solid #a49ef0;
  z-index: -1;
  border-radius: inherit;
  opacity: 0;

  @apply (--transition-trans);
}

.button--student:hover {
  background-color: #fff;
  color: #000 !important;
}

.button--student.button--inverted:hover {
  background-color: #37474f;
  color: #7986cb;
}

.button--student:hover::before {
  transform: scale3d(1, 1, 1);
  opacity: 1;
}

/* student */

.button.button--book {
  background: #ff7680;
  color: #fff;
  transition: background-color 0.3s, color 0.3s;
}

.button--book {
  .button--inverted {
    background: #fff;
    color: #37474f;
  }

  .button--inverted::before {
    border-color: #7986cb;
  }
}

.button--book::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 2px solid #ff7680;
  z-index: -1;
  border-radius: inherit;
  opacity: 0;

  @apply (--transition-trans);
}

.button--book:hover {
  background-color: #fff;
  color: #000;
}

.button--book.button--inverted:hover {
  background-color: #37474f;
  color: #7986cb;
}

.button--book:hover::before {
  -webkit-transform: scale3d(1, 1, 1);
  transform: scale3d(1, 1, 1);
  opacity: 1;
}
</style>


