<template>
  <div class="body">
    <Header></Header>
    <template v-if="alert">
      <Alert :title="alert.title"
        ><small class="text-dark">{{ alert.message }}</small></Alert
      >
    </template>
    <div class="container mt-3">
      <transition name="slide" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Alert from "@/components/Alert";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      alert: "getAlert"
    })
  },
  components: {
    Header,
    Alert
  },
  created() {
    this.$store.dispatch("onInitStocksAction");
  }
};
</script>

<style>
.body {
  position: relative;
}

.slide-enter-active {
  animation: slide-in 200ms ease-out forwards;
}

.slide-leave-active {
  animation: slide-out 200ms ease-out forwards;
}

@keyframes slide-in {
  from {
    transform: translateX(30px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slide-out {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(-30px);
    opacity: 0;
  }
}
</style>
