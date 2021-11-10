import { Component } from '@angular/core';
import { HistoryItem } from './models/HistoryItem';
import { VideoService } from './services/video.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  currentVideo = '';
  history: HistoryItem[] = [];
  bookmarks: HistoryItem[] = [];
  onlyBookMarks = false;
  constructor(private videoService: VideoService) {
    if (!environment.offlineMode) {
      Promise.all([
        this.videoService.getRemoteHistory().toPromise(),
        this.videoService.getBookmarkRemote().toPromise(),
      ])
        .then(([history, bookmarks]) => {
          this.history = history;
          this.bookmarks = bookmarks;
          this.bookmarks.forEach((b) => {
            const toUpdate = this.history.find((h) => h.videoUrl);
            if (toUpdate) {
              toUpdate.isBookMarked = true;
            }
          });
          if (this.history.length > 0) {
            this.currentVideo = this.history[0].videoUrl;
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      this.history = this.videoService.getPreviousHistory();
      this.bookmarks = this.videoService.getPreviousBookmarks();
      if (this.history.length > 0) {
        this.currentVideo = this.history[0].videoUrl;
      }
    }
  }

  toggleSideBar(item: string): void {
    if (item === 'HISTORY') {
      // history
      this.onlyBookMarks = false;
      return;
    }
    // 'BOOKMARKS'
    this.onlyBookMarks = true;
  }

  updateUrl(url: string) {
    this.pushHistory(url);
    this.currentVideo = url;
  }

  pushHistory(url: string): void {
    if (this.currentVideo !== url) {
      const newHistory = {
        videoUrl: url,
        createdAt: new Date(),
        isBookMarked: false,
      };
      this.history = [newHistory].concat(this.history);
      this.videoService.storeHistoryLocally(this.history);
      this.videoService.storeHistoryRemote(newHistory).subscribe(
        (history) => {
          console.log(history);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  pushBookMark(url: string): void {
    const bookMarkIndex = this.bookmarks.findIndex((b) => b.videoUrl === url);
    if (bookMarkIndex === -1) {
      const newBookmark = {
        videoUrl: url,
        createdAt: new Date(),
        isBookMarked: true,
      };
      this.bookmarks = [newBookmark].concat(this.bookmarks);
      // update history
      const historyItem = this.history.find((h) => h.videoUrl === url);
      if (historyItem) {
        historyItem.isBookMarked = true;
        this.videoService.storeHistoryLocally(this.history);
      }
      this.videoService.storeBookmarksLocally(this.bookmarks);
      this.videoService.storeBookmarkRemote(newBookmark).subscribe(
        (history) => {
          console.log(history);
        },
        (err) => {
          console.log(err);
        }
      );
      return;
    }
    this.bookmarks.splice(bookMarkIndex, 1);
    this.videoService.deleteBookmarkRemote(url).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => console.error(error)
    );
    const historyItem = this.history.find((h) => h.videoUrl === url);
    if (historyItem) {
      historyItem.isBookMarked = false;
      this.videoService.storeHistoryLocally(this.history);
    }
    this.videoService.storeBookmarksLocally(this.bookmarks);
  }
}
