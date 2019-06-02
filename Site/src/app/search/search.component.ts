import { Component, OnInit } from '@angular/core';
import { ApisearchService, Results, Track, ISongRequest } from '../apisearch.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  songData: Track[] = [];
  search: string
  constructor(private svc: ApisearchService) { }

  queryField: FormControl = new FormControl();
  ngOnInit() {
    this.queryField.valueChanges
    .subscribe(queryField =>this.svc.SearchSongData(queryField)
    .subscribe(response => this.songData = response.results.trackmatches.track));
  }

  SelectItem(id:string){
    var songRequest: ISongRequest = {songId: id};
    this.svc.PostSong(songRequest).subscribe();
    this.songData = [];
  }

  
}
