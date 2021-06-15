<template>
  <aside class="listing" :class="{'listing--open': menuOpen}">
    <div class="listing__content">
      <button class="listing__switch" @click="switchMenu">
        <svg class="listing__switch-icon" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"/></svg>
      </button>
      <el-tabs v-model="activeListingTab" class="listing__tabs">
         <el-tab-pane label="Метки" name="marks" class="listing__button">
            <div class="listing__content">
               <div class="listing__list" v-for="mark of marks" :key="mark.id">
                  <div class="listing__row">
                    <div class="listing__field">ID</div>
                    <div class="listing__value">{{ mark.id }}</div>
                  </div>
                 <div class="listing__row">
                   <div class="listing__field">Название</div>
                   <div class="listing__value">{{ mark.name }}</div>
                 </div>
                 <div class="listing__row">
                   <div class="listing__field">Описание</div>
                   <div class="listing__value">{{ mark.description }}</div>
                 </div>
                 <div class="listing__row">
                   <div class="listing__field">Широта</div>
                   <div class="listing__value">{{ mark.lat }}</div>
                 </div>
                 <div class="listing__row">
                   <div class="listing__field">Долгота</div>
                   <div class="listing__value">{{ mark.long }}</div>
                 </div>
               </div>
            </div>
         </el-tab-pane>
         <el-tab-pane label="Окружности" name="circles">
           <div class="listing__content">
             <div class="listing__list" v-for="circle of circles" :key="circle.id">
               <div class="listing__row">
                 <div class="listing__field">ID</div>
                 <div class="listing__value">{{ circle.id }}</div>
               </div>
               <div class="listing__row">
                 <div class="listing__field">Название</div>
                 <div class="listing__value">{{ circle.name }}</div>
               </div>
               <div class="listing__row">
                 <div class="listing__field">Адрес</div>
                 <div class="listing__value">{{ circle.address }}</div>
               </div>
               <div class="listing__row">
                 <div class="listing__field">Радиус</div>
                 <div class="listing__value">{{ circle.radius }}</div>
               </div>
               <div class="listing__row">
                 <div class="listing__field">Широта</div>
                 <div class="listing__value">{{ circle.lat }}</div>
               </div>
               <div class="listing__row">
                 <div class="listing__field">Долгота</div>
                 <div class="listing__value">{{ circle.long }}</div>
               </div>
             </div>
           </div>
         </el-tab-pane>
      </el-tabs>
    </div>
  </aside>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import {MapObjects} from "@/interfaces/map-objects.interface";
  import IMark = MapObjects.IMark;
  import ICircle = MapObjects.ICircle;

  @Component({})
  export default class Listing extends Vue {
    menuOpen: boolean = false;
    activeListingTab = 'marks';

    get marks(): IMark[] {
      return this.$store.state.cards.marks;
    }

    get circles(): ICircle[] {
      return this.$store.state.cards.circles;
    }

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
    border: 1px solid #DCDFE6;

    &__row {
      display: flex;
      justify-items: flex-start;
      align-items: stretch;
      border: 1px solid #E4E7ED;
      border-top: none;
      &:first-child {
        border-top: 1px solid #E4E7ED;
      }
    }

    &__list {
      &:not(&:first-child) {
        margin-top: 10px;
      }
    }

    &__field {
      padding: 10px;
      min-width: 100px;
      font-weight: bold;
      border-right: 1px solid #E4E7ED;
    }

    &__value {
      flex-grow: 1;
      padding: 10px;
    }

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

    &__tabs {
      .listing__content {
        overflow-y: auto;
        max-height: 895px;
      }
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
