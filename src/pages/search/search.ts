import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MusicService } from '../../app/shared/music.service';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  initializeItems() {
    this.tracks = [];
    this.artists =[];
  }

  constructor(public navCtrl: NavController,
             public navParams: NavParams, public musicService: MusicService) {
    this.initializeItems();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  searchQuery: string = '';
  tracks: string[] = [];
  artists: string[] =[];


  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;
    if(val != null && val.trim() != ''){
      this.musicService.searchMusic(val, "track")
                       .subscribe((text)=>text.tracks.items.forEach(element => {
                          console.log(element);
                          this.tracks.push(element.name)
                       }));
      this.musicService.searchMusic(val, "artist")
      .subscribe((text)=>text.artists.items.forEach(element => {
        console.log(element);
        this.artists.push(element.name)
     }));
    }
    // if the value is an empty string don't filter the items
    
  }

  playMusicsArtist(artist){
    this.musicService.getTopTracks(artist).subscribe((text)=>console.log(text))
  }

  public playMusic(){
    console.log("Play na música");
  }

  public playTrack(track){
    console.log(track)
    this.musicService.searchMusicById(track).subscribe((text)=>console.log(text))
  }

}
