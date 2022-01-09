import { IGames, IOrders } from "./types"

export interface IStore {
    rental: {
     games: IGames[];
     orders: IOrders[];
     modal: boolean;
     mobileMode: boolean;
     phrase: string;
     sort: string;
     platform: string;
     filteredItems: Array<{}>
     type: Array<{}>
    }
}
