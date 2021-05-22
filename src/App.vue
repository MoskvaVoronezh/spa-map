<template>
  <div id="app" v-if="isInit">
    <router-view :key="$router.currentRoute.fullPath" />
  </div>
</template>


<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component({})
export default class App extends Vue {
  isInit = false;
  async created() {
    this.isInit = true;
  }
 }
</script>

<style lang="scss">

</style>
