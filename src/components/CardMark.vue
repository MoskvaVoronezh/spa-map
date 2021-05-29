<template>
  <div class="card" @click="open" :class="{ 'card--open': isOpened === data.id }">
      <h2 class="card__title" v-if="!(isOpened === data.id)">{{ data.name ? data.name : 'Здесь будет название вашей метки' }}</h2>
      <div class="card__content" @click.prevent>
        <div class="card__group card__name">
          <label :for="`name-marks-${index}`" class="card__label">Название</label>
          <input :id="`name-marks-${index}`" v-model="markName" type="text" class="card__input" placeholder="Введите название метки">
        </div>
        <div class="card__group card__desc">
          <label :for="`desc-${index}`" class="card__label">Описание</label>
          <textarea class="card__textarea" v-model="markDescription" name="desc" :id="`desc-${index}`" cols="30" rows="10" placeholder="Введите описание"></textarea>
        </div>
        <div class="card__group card__long">
          <label :for="`long-${index}`"  class="card__label">Долгота</label>
          <input :id="`long-${index}`" v-model="markLong" type="text" class="card__input" placeholder="Введите долготу">
        </div>
        <div class="card__group card__lat">
          <label :for="`lat-${index}`" class="card__label">Широта</label>
          <input :id="`lat-${index}`" v-model="markLat" type="text" class="card__input" placeholder="Введите широту">
        </div>
        <div class="card__group card__cancel">
          <el-button class="button" type="info" @click="cancelMark">Отмена</el-button>
        </div>
        <div class="card__group card__save">
          <el-button class="button" type="primary">Сохранить</el-button>
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {MapObjects} from "@/interfaces/map-objects.interface";
import IMark = MapObjects.IMark;

@Component({})
export default class CardMark extends Vue {
  @Prop() data: any;
  @Prop() index: any;
  markName: string = "";
  markDescription: string = "";
  markLong: string = "";
  markLat: string = "";

  created() {
  }

  mounted() {
    this.markName = this.data.name;
    this.markDescription = this.data.description;
    this.markLong = this.data.long;
    this.markLat = this.data.lat;
  }

  get isOpened(): boolean {
    return this.$store.state.cards.activeElem;
  }

  open() {
    this.$store.commit('cards/setPropertyInState', { name: 'activeElem', value: this.data.id});
  }

  cancelMark() {
    this.markName = "";
    this.markDescription = "";
    this.markLong = "";
    this.markLat = "";
  }
}
</script>

<style lang="scss">
.card {
  border: 1px solid #E4E7ED;
  border-radius: 5px;

  &__title {
    text-align: center;
    margin: 0;
  }

  &__content {
    padding: 10px;
    display: grid;
    -ms-grid-columns: 1fr 1fr;
    grid-template-areas:
        "name name"
        "desc desc"
        "long lat"
        "cancel save";
    display: none;
    @supports (column-gap: 10px) and (row-gap: 10px) {
      grid-template-columns: repeat(2, 1fr);
      row-gap: 10px;
      column-gap: 10px;
    }
  }

  &__group {
    display: flex;
    flex-direction: column;
  }

  &__textarea {
    width: 100%;
    height: 100%;
    max-height: 80px;
    resize: none;
    color:#606266;
    background: #FFF;
    border: 1px solid #DCDFE6;
    font-size: 14px;
    padding: 12px 20px;
    border-radius: 4px;

    &:hover, &:focus {
      color: #409EFF;
      border-color: #c6e2ff;
      background-color: #ecf5ff;
      outline: none;

      &::placeholder {
        color: #409EFF;
      }
    }
  }

  &__name {
    grid-area: name;
  }

  &__desc {
    grid-area: desc;
  }

  &__long {
    grid-area: long;
  }

  &__lat {
    grid-area: lat;
  }

  &__address {
    grid-area: address;
  }

  &__radius {
    grid-area: radius;
  }

  &__input {
    width: 100%;
    padding: 12px 20px;
    color:#606266;
    background: #FFF;
    border: 1px solid #DCDFE6;
    border-radius: 4px;
    font-size: 14px;

    &:hover, &:focus {
      color: #409EFF;
      border-color: #c6e2ff;
      background-color: #ecf5ff;
      outline: none;

      &::placeholder {
        color: #409EFF;
      }
    }
  }

  &__label {
    margin-bottom: 10px;
    font-weight: bold;
  }

  &__cancel {
    grid-area: cancel;
  }

  &__save {
    grid-area: save;
  }

  &.card--open {
    //background-color: rgba(#409EFF, 0.4);
    background-color: #96C9FF;



    border: 1px solid #b3d8ff;
  }

  &--open & {
    &__content {
      display: grid;
    }
  }
}
</style>
