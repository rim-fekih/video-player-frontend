import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {VideoService} from "../../services/video.service";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  invalidValue=false;
  @Output() urlUpdated: EventEmitter<string> = new EventEmitter<string>();
  @Input() initialValue: string = '';
  url: string;

   constructor(private videoService: VideoService) {
     this.url = this.initialValue;
   }

  ngOnInit(): void {
  }


  validate() : void{
     this.invalidValue = false;
     if(this.videoService.validateYoutubeUrl(this.url)){
       const url = this.videoService.parseUrl(this.url);
       if (url !== ''){
         this.urlUpdated.emit(url);
         return;
       }
     }
    this.invalidValue = true;
  }

}
