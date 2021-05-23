<template>
   <div class="card" @click="opened" :class="{ 'card--open': isOpenCard }">
      <template v-if="type === 'mark'">
         <h2 class="card__title">Название карточки</h2>
         <div class="card__content">
            <div class="card__group card__name">
               <label for="name-marks" class="card__label">Название</label>
               <input id="name-marks" type="text" class="card__input" placeholder="Введите название метки">
            </div>
            <div class="card__group card__desc">
               <label for="desc" class="card__label">Описание</label>
               <textarea class="card__textarea" name="desc" id="desc" cols="30" rows="10" placeholder="Введите описание"></textarea>
            </div>
            <div class="card__group card__long">
               <label for="long" class="card__label">Долгота</label>
               <input id="long" type="text" class="card__input" placeholder="Введите долготу">
            </div>
            <div class="card__group card__lat">
               <label for="lat" class="card__label">Широта</label>
               <input id="lat" type="text" class="card__input" placeholder="Введите широту">
            </div>
            <div class="card__group card__cancel">
               <el-button class="button" type="info" @click="cancelMark">Отмена</el-button>
            </div>
            <div class="card__group card__save">
               <el-button class="button" type="primary">Сохранить</el-button>
            </div>
         </div>
      </template>
      <template v-if="type === 'circle'">
         <h2 class="card__title">Название карточки</h2>
         <div class="card__content card__content--circle">
            <div class="card__group card__name">
               <label for="name-marks" class="card__label">Название</label>
               <input id="name-marks" type="text" class="card__input" placeholder="Введите название окружности">
            </div>
            <div class="card__group card__address">
               <label for="address" class="card__label">Адрес</label>
               <input id="address" type="text" class="card__input" placeholder="Введите адрес">
            </div>
            <div class="card__group card__radius">
               <label for="radius" class="card__label">Радиус</label>
               <input id="radius" type="text" class="card__input" placeholder="Введите радиус">
            </div>
            <div class="card__group card__long">
               <label for="long" class="card__label">Долгота</label>
               <input id="long" type="text" class="card__input" placeholder="Введите долготу">
            </div>
            <div class="card__group card__lat">
               <label for="lat" class="card__label">Широта</label>
               <input id="lat" type="text" class="card__input" placeholder="Введите широту">
            </div>
            <div class="card__group card__cancel">
               <el-button class="button" type="info">Отмена</el-button>
            </div>
            <div class="card__group card__save">
               <el-button class="button" type="primary">Сохранить</el-button>
            </div>
         </div>
      </template>
   </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from "vue-property-decorator";

  @Component({})
  export default class Card extends Vue {
     @Prop() type;
     isOpenCard: boolean = false;
     nameMark: string = '';
     description: string = '';
     longMark: string = '';
     latMark: string = '';

     opened() {
        this.isOpenCard = !this.isOpenCard;
     }

     cancelMark() {

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
        border-bottom: 1px solid #E4E7ED;
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
  }
</style>
