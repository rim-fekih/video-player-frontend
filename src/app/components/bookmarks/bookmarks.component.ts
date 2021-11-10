import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HistoryItem} from "../../models/HistoryItem";

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent implements OnInit {

  @Input()  bookmarks: HistoryItem[] = []
  @Output() historyChosen: EventEmitter<string> = new EventEmitter<string>();
  @Output() bookmarked: EventEmitter<string> = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  clickHandler(url: string): void{
    this.historyChosen.emit(url);
  }

  toggleBookMark(url: string): void{
    const item = this.bookmarks.find(h => h.videoUrl === url);
    if (item){
      this.bookmarked.emit(url);
    }
  }

}
