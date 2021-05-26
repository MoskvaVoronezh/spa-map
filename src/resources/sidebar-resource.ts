import axios, { AxiosResponse } from 'axios';
import {MapObjects} from "@/interfaces/map-objects.interface";

class Resource {

   getLists() :any  {
      const url = 'url';
      return {
         circles: [],
         marks: [
            {
               name: 'Метка 1',
               description: 'Описание метки 1',
               id: 1,
               lat: 55.044159,
               long: 82.998953,
               type: 'mark',
            },
            {
               name: 'Метка 2',
               description: 'Описание метки 2',
               id: 2,
               lat: 55.024159,
               long: 82.198953,
               type: 'mark',
            },
            {
               name: 'Метка 3',
               description: 'Описание метки 3',
               id: 3,
               lat: 55.041159,
               long: 81.1353,
               type: 'mark',
            }
         ]
      }
   }

   addMark(mark): any {
      // post request for add mark
   }
}

export const sidebarResource = new Resource();
