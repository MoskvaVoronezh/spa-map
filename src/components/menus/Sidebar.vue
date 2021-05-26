<template>
  <aside class="sidebar">
      <el-tabs v-model="activeTab" class="sidebar__tabs">
         <el-tab-pane label="Метки" name="marks" class="sidebar__button">
            <div class="sidebar__content">
               <div class="sidebar__list">
                 <template v-if="marks.length === 0">
                   <div class="card" @click="addMark">
                     <h2 class="card__title">Карточка с меткой</h2>
                   </div>
                 </template>
                 <template v-else>
                   <Card v-for="(mark, index) of marks" :data="mark" :index="index" :key="mark.id"  class="sidebar__list-item"/>
                 </template>
               </div>
            </div>
         </el-tab-pane>
         <el-tab-pane label="Окружности" name="circles">
            <div class="sidebar__content">
               <div class="sidebar__list">
                  <template v-if="circles.length === 0">
                    <div class="card">
                        <h2 class="card__title">Карточка с окружностью в шаблоне</h2>
                    </div>
                  </template>
                  <template v-else>
                    <Card v-for="circle of circles"/>
                  </template>
               </div>
            </div>
         </el-tab-pane>
      </el-tabs>
      <el-button v-if="activeTab === 'marks'" type="primary" :disabled="marks.length === 0" @click="addCard()">Добавить метку</el-button>
      <el-button v-if="activeTab === 'circles'" type="primary" :disabled="circles.length === 0" @click="addCard()">Добавить окружность</el-button>
  </aside>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import Card from "@/components/Card.vue";
  import {MapObjects} from "@/interfaces/map-objects.interface";
  import IMark = MapObjects.IMark;
  import ICircle = MapObjects.ICircle;
  @Component({
     components: {
        Card
     },
     computed: {
     }
  })
  export default class Sidebar extends Vue {

		// marks: IMark[] = [];
		// circles: ICircle[] = [];

		created() {
      if (this.marks && this.circles) {
        this.$store.dispatch('cards/getLists');
      }
		}

		get marks(): IMark[] {
      console.log(this.$store.state.cards.marks);
      return this.$store.state.cards.marks;
    }

    get circles(): ICircle[] {
      console.log(this.$store.state.cards.circles);
		  return this.$store.state.cards.circles;
    }

     get activeTab() {
       return this.$store.state.cards.activeTab;
    }

    set activeTab(tab) {
      this.$store.commit('cards/setPropertyInState', { name: 'activeTab', value: tab});
    }

    addCard() {
    }

    addMark() {}

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
