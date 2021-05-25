<template>
  <aside class="sidebar">
      <el-tabs v-model="activeTab" class="sidebar__tabs" @tab-click="changeTab">
         <el-tab-pane label="Метки" name="marks" class="sidebar__button">
            <div class="sidebar__content">
               <div class="sidebar__list">
                 <template v-if="marks.length === 0">
                   <div class="card">
                     <h2 class="card__title">Название карточки</h2>
                   </div>
                 </template>
                 <template v-else>
                   <Card v-for="(mark, index) of marks" :mark="mark" :index="index" :key="mark.id"  class="sidebar__list-item"/>
                 </template>
               </div>
            </div>
         </el-tab-pane>
         <el-tab-pane label="Окружности" name="circles">
            <div class="sidebar__content">
               <div class="sidebar__list">
                  <template v-if="circles.length === 0">
                    <div class="card">
                        <h2 class="card__title">Название карточки</h2>
                    </div>
                  </template>
                  <template v-else>
                    <Card v-for="circle of circles"/>
                  </template>
               </div>
            </div>
         </el-tab-pane>
      </el-tabs>
      <el-button type="primary" @click="addCard()">Добавить</el-button>
  </aside>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import Card from "@/components/Card.vue";
  import {sidebarLeft} from '@/resources/sidebar-resource';
  import {MapObjects} from "@/interfaces/map-objects.interface";
  import IMark = MapObjects.IMark;
  import ICircle = MapObjects.ICircle;
  @Component({
     components: {
        Card
     }
  })
  export default class Sidebar extends Vue {
    // activeTab = 'marks';
		labelPosition: 'top';
		marks: IMark[] = [];
		circles: ICircle[] = [];

		created() {
      const response = sidebarLeft.getLists();
      this.marks = response.marks;
      this.circles = response.circles;
		}

    addCard() {

    }

    changeTab(tab, event) {

    }

		generateID() {
			return '_' + Math.random().toString(36).substr(2, 9);
		}
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

    &__list-item {
      margin-top: 20px;

      &:first-child {
        margin-top: 0;
      }
    }
  }

  .card {
    border: 1px solid #E4E7ED;
    border-radius: 5px;
  }
</style>
