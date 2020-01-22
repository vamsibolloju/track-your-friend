import { Component, AfterViewInit, OnInit, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit, OnChanges {
  private map;
  private marker;
  
  @Input() lon: number;
  @Input() lat: number;
  @Input() mapHeight: string = '100px';
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes:  SimpleChanges){
    setTimeout(() => {
      const lon = Number(changes.lon.currentValue);
      const lat = Number(changes.lat.currentValue);
      if(lon && lat){
        // this.initMap(lon, lat);
        this.setMarker(lon, lat);     
      }
    });
  }

  ngAfterViewInit(): void {
    this.initMap(0, 0);
  }

  private initMap(lon: number, lat: number): void {
    this.map = L.map('map', {
      center: [ lon, lat ],
      zoom: 6
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  setMarker(lon, lat){
    if(this.marker){
      this.map.removeLayer(this.marker);
    }
    this.marker = L.marker([lon, lat]).addTo(this.map);
    this.map.panTo(new L.LatLng(lon, lat));

  }

}
