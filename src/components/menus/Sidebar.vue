<template>
  <aside class="sidebar">
      <el-tabs v-model="activeTab" class="sidebar__tabs">
         <el-tab-pane label="Метки" name="marks" class="sidebar__button">
            <div class="sidebar__content">
               <div class="sidebar__list">
                  <Card :type="'mark'"/>
               </div>
            </div>
         </el-tab-pane>
         <el-tab-pane label="Окружности" name="circles">Окружность</el-tab-pane>
      </el-tabs>
      <el-button type="primary">Добавить</el-button>
  </aside>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import Card from "@/components/Card.vue";
  @Component({
     components: {
        Card
     }
  })
  export default class Sidebar extends Vue {
     activeTab = 'marks';
     labelPosition: 'top';
  }
</script>

<style lang="scss">
  .sidebar {
     --vh: 1vh;
     height: calc(var(--vh)* 100);
     min-height: -webkit-fill-available;
     min-width: 350px;
     width: 25vw;
     padding: 0 10px 10px 10px;
     display: flex;
     flex-direction: column; 
     &__tabs {
        flex-grow: 1;
     }
  }
</style>
