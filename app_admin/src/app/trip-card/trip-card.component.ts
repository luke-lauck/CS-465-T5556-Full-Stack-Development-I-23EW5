import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Trip } from '../models/trip';
import { TripDataService } from '../services/trip-data.service';
import { Location } from '@angular/common';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css']
})
export class TripCardComponent implements OnInit {

  @Input('trip') trip: Trip;

  constructor(
    private router : Router,
    private tripService: TripDataService,
    private location: Location,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    return this.authenticationService.isLoggedIn();
  }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }
   

  private deleteTrip(trip: Trip): void {
    const currentUrl = this.router.url;
    this.tripService.deleteTrip(trip.code)
      .then(data => {
        console.log(data);
       window.location.reload();
    });
  }

  private editTrip(trip: Trip): void {
    localStorage.removeItem("tripCode");
    localStorage.setItem("tripCode", trip.code);
    this.router.navigate(['edit-trip']);
  }
}
