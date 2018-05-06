<template>
    <div>
        <headerComponent></headerComponent>
        <footerComponent></footerComponent>
    </div>
</template>

<script>
import headerComponent from "../../components/header/Header.vue";
import footerComponent from "../../components/footer/Footer.vue";

const fetchInitialData = ({ store }) => {
  return store.dispatch("getUserInfo");
};

export default {
  components: {headerComponent, footerComponent},
  name: "UserInfo",
  asyncData: fetchInitialData,
  mounted() {
    fetchInitialData({ store: this.$store });
  }
};

</script>

