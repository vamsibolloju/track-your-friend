import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';

@Injectable()
export class MarkerService {

  capitals: string = '/assets/data/usa-capitals.geojson';

  constructor(private http: HttpClient) {
  }

  makeCapitalMarkers(map: L.map): void {
    // const marker = L.marker([lon, lat]).addTo(map);  
  }


}