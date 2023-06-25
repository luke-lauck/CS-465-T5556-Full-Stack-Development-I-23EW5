import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Trip } from '../models/trip';
import { User } from '../models/user';
import { AuthResponse } from '../models/authresponse';
import { BROWSER_STORAGE } from '../storage';


@Injectable()
export class TripDataService {

  constructor(private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage) { }

  private apiBaseUrl = 'http://localhost:3000/api/';
  private tripUrl = `${this.apiBaseUrl}trips/`;

  public addTrip(formData: Trip): Promise<Trip> {
    console.log('Inside TripDataService#addTrip');
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.storage.getItem("travlr-token")}`,
    });
    return this.http
      .post<Trip>(`${this.apiBaseUrl}trips`, formData, { headers: headers })
      .toPromise()
      .catch(this.handleError);
  }

  public deleteTrip(tripCode: string): Promise<Trip> {
    console.log('Inside TripDataService#addTrip');
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.storage.getItem("travlr-token")}`,
    });
    return this.http
      .delete<Trip>(this.tripUrl + tripCode, { headers: headers })
      .toPromise()
      .catch(this.handleError);
  }

  public getTrip(tripCode: string): Promise<Trip[]> {
    console.log('Inside TripDataService#getTrip(tripCode)');
    return this.http
      .get<Trip[]>(this.tripUrl + tripCode)
      .toPromise()
      .catch(this.handleError);
  }

  public getTrips(): Promise<Trip[]> {
    console.log('Inside TripDataService#getTrips');
    return this.http
      .get<Trip[]>(`${this.apiBaseUrl}trips`)
      .toPromise()
      .catch(this.handleError);
  }

  public updateTrip(formData: Trip): Promise<Trip> {
    console.log('Inside TripDataService#updateTrip');
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.storage.getItem("travlr-token")}`,
    });
    return this.http
      .put<Trip>(this.tripUrl + formData.code, formData, { headers: headers })
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }

  public login(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('login', user);
  }
  public register(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('register', user);
  }
  private makeAuthApiCall(urlPath: string, user: User): Promise<AuthResponse> {
    const url: string = `${this.apiBaseUrl}${urlPath}`;
    return this.http
      .post(url, user)
      .toPromise()
      .catch(this.handleError);
  }      
}
