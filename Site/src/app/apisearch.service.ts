import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApisearchService {

  APIkey = "e24a5bec7c82e0487d650eb321618a56"
  baseUrl = "http://ws.audioscrobbler.com/2.0/"

  constructor(private http: HttpClient) { }

  SearchSongData(search: string) {
    let params = new HttpParams()
      .set('method', 'track.search')
      .set('api_key', this.APIkey)
      .set('format', 'json')
      .set('track',search);
    return this.http.get<RootObject>(`${this.baseUrl}` , {params: params} )
  }

  GetSongData(mbid: string) {
    let params = new HttpParams()
      .set('method', 'track.getInfo')
      .set('api_key', this.APIkey)
      .set('format', 'json')
      .set('mbid',mbid);
    return this.http.get<IRootTrackInfo>(`${this.baseUrl}` , {params: params} ).toPromise();
  }

  PostSong(song: ISongRequest){
    return this.http.post<ISongRequest>("https://localhost:44396/api/songs", song)
  }

  GetRequestedSongs() {
    return this.http.get<IRequestedSongs[]>("https://localhost:44396/api/songs")
  }


}

export interface IRequestedSongs {
    id: number,
    songId: string,
    requestAmount: number,
    listPlace: number
}

export interface ISongRequest {
  songId: string
}

export interface OpensearchQuery {
  "#text": string;
  role: string;
  startPage: string;
}

export interface Image {
  "#text": string;
  size: string;
}

export interface Track {
  name: string;
  artist: string;
  url: string;
  streamable: string;
  listeners: string;
  image: Image[];
  mbid: string;
}

export interface Trackmatches {
  track: Track[];
}

export interface Attr {
}

export interface Results {
  "opensearch:Query": OpensearchQuery;
  "opensearch:totalResults": string;
  "opensearch:startIndex": string;
  "opensearch:itemsPerPage": string;
  trackmatches: Trackmatches;
  "@attr": Attr;
}

export interface RootObject {
  results: Results;
}

//info song
  export interface Streamable {
      "#text": string;
      fulltrack: string;
  }

  export interface Artist {
      name: string;
      mbid: string;
      url: string;
  }

  export interface Image {
      "#text": string;
      size: string;
  }

  export interface Attr {
      position: string;
  }

  export interface Album {
      artist: string;
      title: string;
      mbid: string;
      url: string;
      image: Image[];
      "@attr": Attr;
  }

  export interface Tag {
      name: string;
      url: string;
  }

  export interface Toptags {
      tag: Tag[];
  }

  export interface Wiki {
      published: string;
      summary: string;
      content: string;
  }

  export interface TrackInfo {
      name: string;
      mbid: string;
      url: string;
      duration: string;
      streamable: Streamable;
      listeners: string;
      playcount: string;
      artist: Artist;
      album: Album;
      toptags: Toptags;
      wiki: Wiki;
  }

  export interface IRootTrackInfo {
    track: TrackInfo;
  }





