import { IGames, IOrder } from "./types"

export interface IStore {
    rental: {
     games: IGames[];
     orders: IOrder[];
     modal: boolean;
     mobileMode: boolean;
    }
}

