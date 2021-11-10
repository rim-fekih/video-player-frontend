import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { VideoViewComponent } from './components/video-view/video-view.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { HistoryComponent } from './components/history/history.component';
import { BookmarksComponent } from './components/bookmarks/bookmarks.component';
import {FormsModule} from "@angular/forms";
import {ClickStopPropagation} from "./shared/click-stop-propagation.directive";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    VideoViewComponent,
    SearchBarComponent,
    HistoryComponent,
    BookmarksComponent,
    ClickStopPropagation
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
