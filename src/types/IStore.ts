import { IGames } from "./types"

export interface IStore {
    rental: {
     games: IGames[];
     modal: boolean;
     mobileMode: boolean;
     phrase: string;
     sort: string;
     platform: string;
     filteredItems: Array<{}>
     type: Array<{}>
    }
}
