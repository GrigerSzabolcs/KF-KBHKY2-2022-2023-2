import { Article } from "./article"

export class Stock {
    public uid: string = ''
    public symbol: string = ''
    public companyName: string = ''
    public photoUrl: string = ''
    public articles:Array<Article> = []
}