<template>
  <aside class="sidebar">
      <el-tabs v-model="activeTab" class="sidebar__tabs">
         <el-tab-pane label="Метки" name="marks" class="sidebar__button">
            <div class="sidebar__content">
               <div class="sidebar__list">
                 <template v-if="marks.length === 0">
                   <div class="card" @click="addMark">
                     <h2 class="card__title">Нажмите чтобы создать метку</h2>
                   </div>
                 </template>
                 <template v-show="marks.length > 0">
                   <CardMark v-for="(mark, index) of marks" :data="mark" :index="index" :key="mark.id" :ref="`markCard-${mark.id}`" class="sidebar__list-item" />
                 </template>
               </div>
            </div>
         </el-tab-pane>
         <el-tab-pane label="Окружности" name="circles">
            <div class="sidebar__content">
               <div class="sidebar__list">
                  <template v-if="circles.length === 0">
                    <div class="card">
                        <h2 class="card__title" @click="addCircle">Нажмите чтобы создать окружность</h2>
                    </div>
                  </template>
                  <template v-else>
                    <CardCircle v-for="(circle, index) of circles" :data="circle" :index="index" :key="circle.id" :ref="`circleCard-${circle.id}`" class="sidebar__list-item"/>
                  </template>
               </div>
            </div>
         </el-tab-pane>
      </el-tabs>
      <el-button class="sidebar__button" v-if="activeTab === 'marks'" type="primary" :disabled="marks.length === 0" @click="addMark">Добавить метку</el-button>
      <el-button class="sidebar__button" v-if="activeTab === 'circles'" type="primary" :disabled="circles.length === 0" @click="addCircle">Добавить окружность</el-button>
  </aside>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import {MapObjects} from "@/interfaces/map-objects.interface";
  import IMark = MapObjects.IMark;
  import ICircle = MapObjects.ICircle;
  import CardMark from "@/components/CardMark.vue";
  import CardCircle from "@/components/CardCircle.vue";
  import {bus} from "@/plugins/bus";

  @Component({
     components: {
       CardMark,
       CardCircle,
     },
     computed: {
     }
  })
  export default class Sidebar extends Vue {

		created() {
      if (this.marks && this.circles) {
        this.$store.dispatch('cards/getLists');
      }
		}

		mounted() {
		  bus.$on('openCardMark', (id) => {
        if (this.$refs[`markCard-${id}`][0].data.name === "" || this.$refs[`markCard-${id}`][0].data.description === "" || this.$refs[`markCard-${id}`][0].data.lat === "" || this.$refs[`markCard-${id}`][0].data.long === "") {
          this.$store.commit('cards/setStateMark', { id, state: 'error' });
        }
      });

      bus.$on('openCardCircle', (id) => {
        console.log(this.$refs[`circleCard-${id}`][0].data);
        if (this.$refs[`circleCard-${id}`][0].data.name === "" || this.$refs[`circleCard-${id}`][0].data.address === "" || this.$refs[`circleCard-${id}`][0].data.lat === "" || this.$refs[`circleCard-${id}`][0].data.long === "" || this.$refs[`circleCard-${id}`][0].data.radius === "") {
          this.$store.commit('cards/setStateCircle', { id, state: 'error' });
        }
      });
    }

		get marks(): IMark[] {
      return this.$store.state.cards.marks;
    }

    get circles(): ICircle[] {
		  return this.$store.state.cards.circles;
    }

    get activeTab() {
      return this.$store.state.cards.activeTab;
    }

    set activeTab(tab) {
      this.$store.commit('cards/setPropertyInState', { name: 'activeTab', value: tab});
    }

    addMark() {
      this.$store.dispatch('cards/addCardMark');
    }

    addCircle() {
      this.$store.dispatch('cards/addCardCircle');
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
    overflow-y: auto;
    position: relative;
    &__tabs {
      flex-grow: 1;
      .el-tabs__header {
        position: sticky;
        top: 0;
        background-color: #fff;
        z-index: 10;
      }
    }

    &__list {
      display: flex;
      flex-direction: column;
    }

    &__list-item {
      margin-bottom: 20px;
    }

    &__button {
      position: sticky;
      bottom: 0;
    }
  }

  .card {
    border: 1px solid #E4E7ED;
    border-radius: 5px;
  }
</style>
