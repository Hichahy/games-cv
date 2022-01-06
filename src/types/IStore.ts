import { IGames, IOrder } from "./types"

export interface IStore {
    rental: {
     games: IGames[];
     orders: IOrder[];
     modal: boolean;
     mobileMode: boolean;
     phrase: string;
     sort: string;
     platform: string;
     filteredItems: Array<{}>
     type: Array<{}>
    }
}
