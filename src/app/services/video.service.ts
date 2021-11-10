import { Injectable } from '@angular/core';
import {HistoryItem} from "../models/HistoryItem";
import {BOOKMARK_ENDPOINT, BOOKMARKS_KEY, HISTORY_ENDPOINT, HISTORY_KEY} from "../shared/constants";
import {getIifeBody} from "@angular/compiler-cli/ngcc/src/host/esm2015_host";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VideoService {


  constructor(private httpClient: HttpClient) { }

  validateYoutubeUrl(url: string): boolean{
    const p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    return p.test(url);
  }


  parseUrl(url: string): string {
    if (url != undefined || url != '') {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|\?v=)([^#&?]*).*/;
      const match = url.match(regExp);
      if (match && match[2].length == 11) {
        // URL valid then return the parsed one for the embed player
        return `https://www.youtube.com/embed/${match[2]}?autoplay=0`;
      }
    }
    // url is not valid then return empty string
    return '';
  }

  storeHistoryLocally(history: HistoryItem[]): void{
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  }

  storeBookmarksLocally(bookMark: HistoryItem[]): void{
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookMark));
  }

  getPreviousHistory(): HistoryItem[]{
    const previousHistory = localStorage.getItem(HISTORY_KEY);
    return previousHistory !== null ? JSON.parse(previousHistory) as HistoryItem[] : [];
  }

  getPreviousBookmarks(): HistoryItem[]{
    const previousBookmarks = localStorage.getItem(BOOKMARKS_KEY);
    return previousBookmarks !== null ? JSON.parse(previousBookmarks) as HistoryItem[] : [];
  }

  getRemoteHistory(): Observable<HistoryItem[]>{
    return this.httpClient.get<HistoryItem[]>(HISTORY_ENDPOINT);
  }

  storeHistoryRemote(history: HistoryItem): Observable<HistoryItem>{
    return this.httpClient.post<HistoryItem>(HISTORY_ENDPOINT, history);
  }



  getBookmarkRemote(): Observable<HistoryItem[]>{
    return this.httpClient.get<HistoryItem[]>(BOOKMARK_ENDPOINT);
  }

  storeBookmarkRemote(history: HistoryItem): Observable<HistoryItem>{
    return this.httpClient.post<HistoryItem>(BOOKMARK_ENDPOINT, history);
  }
  deleteBookmarkRemote(url: string): Observable<any>{
    return this.httpClient.delete(BOOKMARK_ENDPOINT + `?url=${encodeURI(url)}`);
  }



}
