import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HistoryItem} from "../../models/HistoryItem";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  @Input() history: HistoryItem[] = []
  @Output() historyChosen: EventEmitter<string> = new EventEmitter<string>();
  @Output() bookmarked: EventEmitter<string> = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  clickHandler(url: string): void{
    this.historyChosen.emit(url);
  }

  toggleBookMark(url: string): void{
    const item = this.history.find(h => h.videoUrl === url);
    if (item){
      this.bookmarked.emit(url);
    }
  }
}

