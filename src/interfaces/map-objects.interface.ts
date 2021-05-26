export namespace MapObjects {
   export interface IState {
      activeTab: string;
      activeElem: string;
      marks: IMark[];
      circles: ICircle[];
   }
   export interface IMark {
      name: string;
      description: string;
      id: string;
      isOpened: boolean;
      type: string;
      lat: string;
      long: string;
      state: string;
   }

   export interface ICircle {
      name: string;
      address: string;
      id: string;
      isOpened: boolean;
      radius: number;
      type: string;
      lat: string;
      long: string;
      state: string;
   }
}

