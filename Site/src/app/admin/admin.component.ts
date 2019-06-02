import { Component, OnInit } from '@angular/core';
import { ApisearchService, IRequestedSongs, TrackInfo, IRootTrackInfo } from '../apisearch.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

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
      this.songs = result;
      this.songs.sort(function(a,b){
        if (a.listPlace > b.listPlace)
          return 1;
        if (a.listPlace < b.listPlace)
          return -1;
        else
          return 0;
      })
      this.GetSongsData();

    })
  }

  async GetSongsData() {
    this.newDataSongs = []
    for (var i = 0; i < this.songs.length; i++){
      var DataSong: IRootTrackInfo = await this.svc.GetSongData(this.songs[i].songId);
      this.newDataSongs.push(DataSong.track)
    }
    if (this.newDataSongs != this.DataSongs)
      this.DataSongs = this.newDataSongs;
  }

  PlayNextSong() {
    this.svc.RemoveSong(this.songs[0].id).subscribe();
  }
}
