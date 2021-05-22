<template>
  <div class="page">
    home
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";

  @Component({})
  export default class HomePage extends Vue {
    created() {
      console.log('created');
    }
  }
</script>

<style lang="scss">
  
</style>
