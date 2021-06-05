<template>
  <div class="card" @click="open" :class="{ 'card--open': isOpened === data.id }">
    <h2 class="card__title" v-if="!(isOpened === data.id)">{{ data.name ? data.name : 'Здесь будет название вашей окружности' }}</h2>
    <div class="card__content card__content--circle">
      <div class="card__group card__name">
        <label :for="`name-circle-${index}`" class="card__label">Название</label>
        <input :id="`name-circle-${index}`" v-model="name" type="text" class="card__input" placeholder="Введите название окружности">
      </div>
      <div class="card__group card__address">
        <label :for="`address-${index}`" class="card__label">Адрес</label>
        <input :id="`address-${index}`" v-model="address" type="text" class="card__input" placeholder="Введите адрес">
      </div>
      <div class="card__group card__radius">
        <label :for="`radius-${index}`" class="card__label">Радиус</label>
        <input :id="`radius-${index}`"  v-model="radius" type="text" class="card__input" placeholder="Введите радиус">
      </div>
      <div class="card__group card__long">
        <label :for="`circle-long-${index}`" class="card__label">Долгота</label>
        <input :id="`circle-long-${index}`" v-model="long" type="text" class="card__input" placeholder="Введите долготу">
      </div>
      <div class="card__group card__lat">
        <label :for="`circle-lat-${index}`" class="card__label">Широта</label>
        <input :id="`circle-lat$-${index}`" v-model="lat" type="text" class="card__input" placeholder="Введите широту">
      </div>
      <div class="card__group card__cancel">
        <el-button class="button" type="info" @click.stop="clearCircle">Отмена</el-button>
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
import {bus} from "@/plugins/bus";

@Component({})
export default class CardCircle extends Vue {
  @Prop() data: any;
  @Prop() index: any;

  name: string = "";
  address: string = "";
  lat: string = "";
  long: string = ""
  radius: number = null;

  created() {
    this.name = this.data.name;
    this.address = this.data.address;
    this.lat = this.data.lat;
    this.long = this.data.long;
    this.radius = this.data.radius;
  }

  mounted() {

  }

  get isOpened(): boolean {
    return this.$store.state.cards.activeElem;
  }

  open() {
    if (this.data.lat && this.data.long) {
      bus.$emit('openCircle',{ id: this.data.id, lat: this.data.lat, long: this.data.long, name: this.data.name, radius: this.data.radius, address: this.data.address });
    }

    this.$store.commit('cards/setPropertyInState', { name: 'activeElem', value: this.data.id});
  }

  clearCircle() {
    this.name = "";
    this.address = "";
    this.lat = "";
    this.long = "";
    this.radius = null;

    this.$store.state.cards.circles.forEach(circle => {
      if (circle.id === this.data.id) {
        bus.$emit('deleteCircle', {id: this.data.id});
        this.$store.dispatch('cards/clearCircle', {id: this.data.id});
        this.$store.commit('cards/setPropertyInState', { name: 'activeElem', value: null});
      }
    });
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

  &__content--circle {
    padding: 10px;
    display: grid;
    -ms-grid-columns: 1fr 1fr;
    grid-template-areas:
        "name name"
        "address address"
        "radius radius"
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
    color: #606266;
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
