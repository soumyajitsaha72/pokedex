export class Pokemon {
    id : number;
    name : string;
    types : any[];
    abilities : any[]
    height : number;
    weight : number;
    details : string;
    stats : any[];
    evolution : any[];

    constructor(id:number, name:string, height:number, weight: number, abilities:any[], types:any[], stats:any[], details:string, evolution:any[]) {
        this.id = id;
        this.name = name;
        this.height = height;
        this.weight = weight;
        this.abilities = abilities;
        this.types = types;
        this.stats = stats;
        this.details = details;
        this.evolution = evolution;
    }
}