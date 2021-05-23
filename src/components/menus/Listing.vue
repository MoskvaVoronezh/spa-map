<template>
  <aside class="listing" :class="{'listing--open': menuOpen}">
    <div class="listing__content">
      <button class="listing__switch" @click="switchMenu">
        <svg class="listing__switch-icon" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"/></svg>
      </button>
      <el-tabs v-model="activeTab" class="listing__tabs">
         <el-tab-pane label="Метки" name="marks" class="listing__button">
            <div class="listing__content">
               <div class="listing__list">
                
               </div>
            </div>
         </el-tab-pane>
         <el-tab-pane label="Окружности" name="circles">Окружность</el-tab-pane>
      </el-tabs>
    </div>
  </aside>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";

  @Component({})
  export default class Listing extends Vue {
    menuOpen: boolean = false;
    activeTab: 'marks';

    switchMenu() {
      this.menuOpen = !this.menuOpen;
    }
  }
</script>

<style lang="scss" scoped>
  .listing {
    --vh: 1vh;
    background-color: #fff;
    height: calc((var(--vh)) * 100);
    min-height: -webkit-fill-available;
    position: absolute;
    width: 0;
    right: 0;
    top: 0;
    transition: right, width 0.3s;
    display: flex;
    flex-direction: column;

    &--open {
      width: 33vw;
      right: 0;
      padding: 0 10px 10px 10px;
    }

    &--open & {
      &__switch {
        transform: rotate(-360deg);
        left: -50px;
      }
    }

    &__content {
      position: relative;
      flex: 1;
    }

    &__switch {
      width: 40px;
      height: 40px;
      border-radius: 4px;
      background: #fff;
      border: 1px solid #DCDFE6;
      left: -40px;
      top: 0;
      position: absolute;
      transform: rotate(180deg);
    }

    &__switch-icon {
      fill: #409EFF;
    }
  }
</style>
