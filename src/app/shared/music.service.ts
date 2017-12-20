import { Http, Response, Headers } from "@angular/http";
import { Injectable } from '@angular/core';

import { Observable } from "rxjs/Observable";

import { Track } from './track.model';
import { Artist } from './artist.model';

@Injectable()
export class MusicService {

    private client_id = 'CLIENT_ID'; // Your client id
    private client_secret = 'CLIENT_SECRET'; // Your secret
    private redirect_uri = 'REDIRECT_URI'; // Your redirect uri

    public searchUrl = "https://api.spotify.com/v1/search";
    public headers = new Headers({'Content-type': 'application/json',
                                'Authorization': 'Bearer BQAayC9fLrV918hepI6_3ahxRsW_8v7wXskDYSORU0KY0rwDzmNU_H3l6QAnpqfXrYRm9bJqpg0ttOO6bJlPBLgOHpFDnJ3dKQm8c8DFM4Md8k6w4xMvnZp3EWuqoD66Jui5AH7gAuGUCCMtlJJ4QB2XRfLhBB4HbyTtC8XJGWfEJkCvkE9e_OiMnfuJ9CmTEP6Fc9njJVw'
                                });
    
    public constructor(
        private http: Http
    ){}

    public searchMusic(title: String, typeSearch: String): Observable<any>{
        let url = `${this.searchUrl}?q=${title}&type=${typeSearch}&limit=5`

        return this.http.get(url, {headers:this.headers})
                .catch(this.hendleErrors)
                .map((response: Response) => response.json());
    }

    public searchMusicById(id: String): Observable<any>{
        // https://api.spotify.com/v1/tracks/{id}
        let url = `	https://api.spotify.com/v1/audio-features/${id}`;

        return this.http.get(url, {headers:this.headers})
                .catch(this.hendleErrors)
                .map((response: Response) => response.json());
    }

    public getTopTracks(idArtist: string): Observable<Track>{
        //	https://api.spotify.com/v1/artists/{id}/top-tracks
        let url = `https://api.spotify.com/v1/artists/${idArtist}/top-tracks?country=BR`;
        
                return this.http.get(url, {headers:this.headers})
                        .catch(this.hendleErrors)
                        .map((response: Response) => response.json() as Track);
    }

    private hendleErrors(error: Response) {
        console.log("Salvando em algum lugar o erro", error);
        return Observable.throw(error);
    }
}