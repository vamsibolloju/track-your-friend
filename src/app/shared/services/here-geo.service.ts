import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HereGeoService {
    private platform;
    private geocoder;
     
    constructor(){
        this.platform = new window['H'].service.Platform({
            'apikey': 'bji9VJpaLIdb45k-Dba7_cYqHFn3HN7h4HeWDI9iDGw'
          });
          this.geocoder = this.platform.getGeocodingService()  
    }

    getAddress(lat: number, lon: number): Observable<object>{
        const reverseGeocodingParameters = {
            prox: `${lat},${lon},150`,
            mode: 'retrieveAddresses',
            maxresults: 1
          }

        return new Observable(observer => {
            this.geocoder.reverseGeocode(
                reverseGeocodingParameters,
                (result) => {
                    if(result['Response']['View'].length) {
                        observer.next(result['Response']['View'][0]['Result'][0]['Location']['Address']);   
                    }else{
                        observer.error("No address found!");
                    }
                },
                (e) => { 
                    console.log(e); 
                });
        })


    }


}
  