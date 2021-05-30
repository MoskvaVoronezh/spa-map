import axios, { AxiosResponse } from 'axios';
import {MapObjects} from "@/interfaces/map-objects.interface";

class Resource {

   getLists() :any  {
      const url = 'url';
      return {
         circles: [
            {
               name: 'Окружность 1',
               address: 'адрес',
               id: 'circle_1',
               lat: 55.060321220898125,
               long: 82.99208654492188,
               type: 'circle'
            }
         ],
         marks: [
            {
               name: 'Метка 1',
               description: 'Описание метки 1',
               id: 1234,
               lat: 55.044159,
               long: 82.998953,
               type: 'mark',
            },
            {
               name: 'Метка 2',
               description: 'Описание метки 2',
               id: 12345,
               lat: 55.024159,
               long: 82.198953,
               type: 'mark',
            },
            {
               name: 'Метка 3',
               description: 'Описание метки 3',
               id: 123456,
               lat: 55.041159,
               long: 81.1353,
               type: 'mark',
            }
         ]
      }
   }

   generateID() {
      return '_' + Math.random().toString(36).substr(2, 9);
   }

   addCardMark(): any {
      // post request for add mark
      const id = this.generateID();
      return {
         name: '',
         description: '',
         id,
         lat: '',
         long: '',
         type: 'mark',
         isOpened: false,
         state: 'closed'
      }
   }

   addCardCircle(): any {
      // post request for add circle
      const id = this.generateID();
      return {
         name: '',
         address: '',
         id,
         isOpened: false,
         radius: null,
         type: 'circle',
         lat: '',
         long: '',
         state: 'closed'  //open, closed, closed-error
      }
   }

   clearMark(mark): any {
      mark.name = "";
      mark.description = "";
      mark.lat = "";
      mark.long = "";
      return mark;
   }

}

export const sidebarResource = new Resource();
