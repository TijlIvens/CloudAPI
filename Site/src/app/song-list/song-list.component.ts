import { Component, OnInit } from '@angular/core';
import { ApisearchService, IRequestedSongs, TrackInfo, IRootTrackInfo } from '../apisearch.service';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css']
})
export class SongListComponent implements OnInit {

  newSongs: IRequestedSongs[];
  songs: IRequestedSongs[];
  newDataSongs: TrackInfo[] = null;
  DataSongs: TrackInfo[] = null;
  interval: any;
  constructor(private svc: ApisearchService) { }

  ngOnInit() {
    this.GetSongs();
    this.interval = setInterval(() => { 
      this.GetSongs(); 
  }, 2000);
  }

  GetSongs() {
    this.svc.GetRequestedSongs().subscribe(result => {
      this.newSongs = result;
      this.newSongs.sort(function(a,b){
        if (a.listPlace > b.listPlace)
          return 1;
        if (a.listPlace < b.listPlace)
          return -1;
        else
          return 0;
      })
      if (!this.arraysEqual(this.newSongs, this.songs))
      {
        this.songs = this.newSongs;
        this.GetSongsData();
      }
      

    })
  }

  async GetSongsData() {
    this.newDataSongs = []
    for (var i = 0; i < this.songs.length; i++){
      var DataSong: IRootTrackInfo = await this.svc.GetSongData(this.songs[i].songId);
      this.newDataSongs.push(DataSong.track)
    }
      this.DataSongs = this.newDataSongs;
  }

  arraysEqual(_arr1: IRequestedSongs[], _arr2: IRequestedSongs[]) {

    if (!Array.isArray(_arr1) || ! Array.isArray(_arr2) || _arr1.length !== _arr2.length)
      return false;

    var arr1 = _arr1.concat().sort();
    var arr2 = _arr2.concat().sort();

    for (var i = 0; i < arr1.length; i++) {

        if (arr1[i].id !== arr2[i].id)
            return false;
        if (arr1[i].listPlace !== arr2[i].listPlace)
            return false;
        if (arr1[i].requestAmount !== arr2[i].requestAmount)
            return false;
        if (arr1[i].songId !== arr2[i].songId)
            return false;
    }

    return true;

  }
}
