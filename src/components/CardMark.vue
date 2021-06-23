<template>
  <div class="card" @click="open" :class="{ 'card--open': isOpened === data.id, 'card--with-error': data.state === 'error' }">
      <h2 class="card__title" v-if="!(isOpened === data.id)">{{ data.name ? data.name : 'Здесь будет название вашей метки' }}</h2>
      <div class="card__content" @click.prevent>
        <div class="card__group card__name">
          <label :for="`name-marks-${index}`" class="card__label">Название
            <button class="card__delete" @click="deleteMark">
              <svg id="Layer_1" enable-background="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg"><g><path d="m424 64h-88v-16c0-26.467-21.533-48-48-48h-64c-26.467 0-48 21.533-48 48v16h-88c-22.056 0-40 17.944-40 40v56c0 8.836 7.164 16 16 16h8.744l13.823 290.283c1.221 25.636 22.281 45.717 47.945 45.717h242.976c25.665 0 46.725-20.081 47.945-45.717l13.823-290.283h8.744c8.836 0 16-7.164 16-16v-56c0-22.056-17.944-40-40-40zm-216-16c0-8.822 7.178-16 16-16h64c8.822 0 16 7.178 16 16v16h-96zm-128 56c0-4.411 3.589-8 8-8h336c4.411 0 8 3.589 8 8v40c-4.931 0-331.567 0-352 0zm313.469 360.761c-.407 8.545-7.427 15.239-15.981 15.239h-242.976c-8.555 0-15.575-6.694-15.981-15.239l-13.751-288.761h302.44z"/><path d="m256 448c8.836 0 16-7.164 16-16v-208c0-8.836-7.164-16-16-16s-16 7.164-16 16v208c0 8.836 7.163 16 16 16z"/><path d="m336 448c8.836 0 16-7.164 16-16v-208c0-8.836-7.164-16-16-16s-16 7.164-16 16v208c0 8.836 7.163 16 16 16z"/><path d="m176 448c8.836 0 16-7.164 16-16v-208c0-8.836-7.164-16-16-16s-16 7.164-16 16v208c0 8.836 7.163 16 16 16z"/></g></svg>
            </button>
          </label>
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
          <el-button class="button" type="info" @click.stop="cancelMark">Отмена</el-button>
        </div>
        <div class="card__group card__save">
          <el-button class="button" type="primary" @click.stop="saveMark">Сохранить</el-button>
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {bus} from "@/plugins/bus";

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
    if (this.data.lat && this.data.long) {
      bus.$emit('openMark',{ id: this.data.id, lat: this.data.lat, long: this.data.long, name: this.markName ? this.markName : this.data.name, description: this.markDescription ? this.markDescription : this.data.description });
    }
    this.$emit('openCardMark', this.data.id);
    this.$store.commit('cards/setPropertyInState', { name: 'activeElem', value: this.data.id});
  }

  saveMark() {
    if (!this.markName || !this.markDescription || !this.markLong || !this.markLat) {
      this.$store.commit('cards/setStateMark', {id: this.data.id});
    }

    this.$store.commit('cards/setPropertyInState', { name: 'activeElem', value: ""});
    this.$store.dispatch('cards/saveMark', { id: this.data.id, name: this.markName, description: this.markDescription, lat: this.markLat, long: this.markLong });
    bus.$emit('saveMark', { id: this.data.id, name: this.markName, description: this.markDescription, lat: this.markLat, long: this.markLong });
  }

  cancelMark() {
    this.markName = this.data.name;
    this.markDescription = this.data.description;
    this.markLong = this.data.long;
    this.markLat = this.data.lat;
    this.$store.commit('cards/setPropertyInState', { name: 'activeElem', value: ""});

    if (this.markName === "" || this.markDescription === "" || this.markLong === "" || this.markLat === "") {
      this.$store.commit('cards/setStateMark', {id: this.data.id, state: 'error'});
    }

    // if (this.markName === "" && this.markDescription === "" &&  this.markLong === "" &&  this.markLat === "") {
    //   return;
    // }
    // this.markName = "";
    // this.markDescription = "";
    // this.markLong = "";
    // this.markLat = "";
    //
    // bus.$emit('clearMark', this.data.id);
    // this.$store.commit('cards/setPropertyInState', { name: 'activeElem', value: ""});
    // this.$store.dispatch('cards/clearMark', { id: this.data.id });
  }

  deleteMark() {
    bus.$emit('clearMark', this.data.id);
    this.$store.commit('cards/setPropertyInState', { name: 'activeElem', value: ""});
    this.$store.dispatch('cards/clearMark', { id: this.data.id });
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
        "lat long"
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

  &__delete {
    background-color: #fff;
    border-radius: 50%;
    border: 1px solid #409EFF;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 35px;

    svg {
      width: 20px;
      height: 20px;
    }
  }

  &__label {
    margin-bottom: 10px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: space-between;
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

  &.card--with-error {
    background-color: #f56c6c;
  }

  &--open & {
    &__content {
      display: grid;
    }
  }
}
</style>
