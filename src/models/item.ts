import { Guid } from "guid-typescript"

export interface Items {
    id: Guid,
    bic: String,
    name: String,
    corrAccount: String
}