import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-add-cage-page',
  templateUrl: './add-cage-page.page.html',
  styleUrls: ['./add-cage-page.page.scss'],
})
export class AddCagePagePage implements OnInit {


  
  ngOnInit() {
	  this.geolocation.getCurrentPosition().then((resp) => {
		 this.coords_lat = resp.coords.latitude;
		 this.coords_long = resp.coords.longitude;
		}).catch((error) => {
		  console.log('Error getting location', error);
		});
  }

  constructor(private geolocation: Geolocation) { }

  coords_lat: any;
  coords_long: any;
}
