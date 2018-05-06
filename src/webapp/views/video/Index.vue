<template>
    <div>
        <headerComponent></headerComponent>
        <videoComponent></videoComponent>
        <footerComponent></footerComponent>
    </div>
</template>
 
<script>
import headerComponent from "../../components/header/Header.vue";
import footerComponent from "../../components/footer/Footer.vue";
import videoComponent from "../../components/video/Video.vue";

const fetchInitialData = ({ store }) => {
  return store.dispatch("getUserInfo");
};

export default {
  components: {headerComponent, footerComponent,videoComponent},
  name: "UserInfo",
  asyncData: fetchInitialData,
  mounted() {
    fetchInitialData({ store: this.$store });
  }
};
</script>




