import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-video-view',
  templateUrl: './video-view.component.html',
  styleUrls: ['./video-view.component.scss']
})
export class VideoViewComponent implements OnInit, OnChanges {

  @Input() videoUrl = '';
  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
  }

  onLoad(): void{

  }
  safeUrl(url: string){
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  ngOnChanges(changes: SimpleChanges): void {
  }
}
