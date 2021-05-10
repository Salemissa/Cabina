import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Patient } from '../Model/Patient';

@Injectable({
  providedIn: 'root'
})
export class MedecinService {

  public host = environment.apiUrl;
  private MedecinBSubjet = new BehaviorSubject<[any]>(null);
  constructor(private http:HttpClient) { }

  public getResource(url):Observable<any> {
  
    return this.http.get<any>(this.host+url);
  }


  public getMedeicns(): Observable<[any]> {
    return this.MedecinBSubjet.asObservable();
  }

  public setMedecinsSubjectValue(data) {
    console.info("setLangueSubjectValue subject next: ", data)
    this.MedecinBSubjet.next(data);
  }
  public getMedecinsBSubjectValue(){
    return this.MedecinBSubjet.getValue();
  }

  
  public addMedecin(medecin){
    let path = this.host+"general/addMedecin";
    return this.http.post(path, medecin);
  }

  public getPatientByCode(code){
    let path = this.host+"PatientsByCode/"+code;
    return this.http.get<Patient>(path);
  }
}
