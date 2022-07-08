import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './home/navbar/navbar.component';
import { BodyComponent } from './home/body/body.component';
import { FooterComponent } from './home/footer/footer.component';
import { PokemonCardComponent } from './home/body/pokemon-card/pokemon-card.component';
import { SearchPipe } from './pipes/search/search.pipe';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { SelectedPokmonComponent } from './selected-pokmon/selected-pokmon.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ImageFallbackDirective } from './shared/image-fallback/image-fallback.directive';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BodyComponent,
    FooterComponent,
    PokemonCardComponent,
    SearchPipe,
    HomeComponent,
    SelectedPokmonComponent,
    ImageFallbackDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    InfiniteScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
