import { EventEmitter, Injectable } from "@angular/core";

@Injectable({providedIn:"root"})
export class SearchService {
    search = new EventEmitter<string>;
}