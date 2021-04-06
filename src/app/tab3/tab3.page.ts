import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FotoService } from '../foto.service';

export interface fileFoto {
  name: string; //filepath
  path: string; //web view path

}
@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {

  urlImageStorage : string[] = [];

  constructor(
    private afStorage : AngularFireStorage,
    public fotoService : FotoService
  ) { }

  async ngOnInit() {
    await this.fotoService.loadFoto();
  }

  async ionViewDidEnter() {
    await this.fotoService.loadFoto();
    this.tampilkanData();
  }

  tampilkanData() {
    this.urlImageStorage=[];
    var refImage = this.afStorage.storage.ref('imgStorage');
    refImage.listAll()
    .then ((res) => {
      res.items.forEach((itemRef) => {
        itemRef.getDownloadURL().then(url => {
          this.urlImageStorage.unshift(url)
        })
      });
    }).catch((error) => {
      console.log(error);
    });
  }

}
