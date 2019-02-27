import { Component, ViewChild, ElementRef } from '@angular/core';
import leaflet from 'leaflet';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

import { Socket } from 'ng-socket-io';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('map') mapContainer: ElementRef;
  map: any;
  
  constructor(private localNotifications: LocalNotifications, private socket: Socket) { }

  ionViewDidEnter() {
    this.loadmap();
	
	this.initMqtt();
  }

  loadmap() {
	var greenIcon = leaflet.icon({
		iconUrl: '../assets/marmotte.png',

		iconSize:     [30, 30], // size of the icon
		iconAnchor:   [30, 30], // point of the icon which will correspond to marker's location
		shadowAnchor: [4, 62],  // the same for the shadow
		popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
	});

    this.map = leaflet.map("map").fitWorld();
    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: '',
      maxZoom: 18
    }).addTo(this.map);
	
	this.map.locate({
      setView: true,
      maxZoom: 10
    }).on('locationfound', (e) => {
      let markerGroup = leaflet.featureGroup();
      let marker: any = leaflet.marker([e.latitude, e.longitude], {icon: greenIcon}).on('click', () => {
      })
	  marker.bindPopup("<h3><b>Marmotte détectée</b></h3><p>Coordonnées : " + e.latitude + ", " + e.longitude + "</p><p>Heure : 12h25</p>").openPopup();
      markerGroup.addLayer(marker);
      this.map.addLayer(markerGroup);
      }).on('locationerror', (err) => {
        alert(err.message);
    })
  }
  
  addCage(){
	console.log("Adding new cage");
  }
  
  openNotification(){
	  this.localNotifications.schedule({
		  id: 1,
		  title: 'Notification',
		  text: 'Marmotte détectée !!',
		  sound: 'file://assets/marmotte.mp3',
		  foreground: true,
		  priority: 1,
		  led: { color: '#FF00FF', on: 500, off: 500 },
		  vibrate: true,
		  actions: [
			{ id: 'yes', title: "J'y vais" },
			{ id: 'no',  title: 'Le plus proche' }
		  ]
		});
  }
  
  initMqtt(){
	  console.log("Intit MQTT");
	  this.socket.connect();
	  this.socket.emit('test', 'test');
	  
	  this.socket.on('message', (data) => {
        this.localNotifications.schedule({
		  id: 1,
		  title: 'Notification',
		  text: 'Marmotte détectée !!',
		  sound: 'file://assets/marmotte.mp3',
		  foreground: true,
		  priority: 1,
		  led: { color: '#FF00FF', on: 500, off: 500 },
		  vibrate: true,
		  actions: [
			{ id: 'yes', title: "J'y vais" },
			{ id: 'no',  title: 'Le plus proche' }
		  ]
		});
      });

  }

}
