import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  searchText : string

  constructor(private searchService : SearchService) { }

  ngOnInit(): void {
  }

  onInput(text: string){
    this.searchService.search.emit(text);
  }

}
