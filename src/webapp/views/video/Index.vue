<template>
    <div>
        <!-- <headerComponent></headerComponent> -->
        <videoComponent></videoComponent>
        <footerComponent></footerComponent>
    </div>
</template>
 
<script>
// import headerComponent from "../../components/header/Header.vue";
import footerComponent from "../../components/footer/Footer.vue";
import videoComponent from "../../components/video/Video.vue";

const fetchInitialData = ({ store }) => {
  return store.dispatch("getvideoTitle");
};

export default {
  components: { footerComponent,videoComponent},
  name: "videoTitle",
  asyncData: fetchInitialData,
  mounted() {
    fetchInitialData({ store: this.$store });
  }
};

</script>




