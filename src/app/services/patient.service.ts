import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Patient } from '../Model/Patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
 
  public host = environment.apiUrl;
  private PatientBSubjet = new BehaviorSubject<[Patient]>(null);
  constructor(private http:HttpClient) { }

  public getResource(url):Observable<any> {
  
    return this.http.get<Patient>(this.host+url);
  }


  public getPatient(): Observable<[Patient]> {
    return this.PatientBSubjet.asObservable();
  }

  public setPatientsSubjectValue(data) {
    console.info("setLangueSubjectValue subject next: ", data)
    this.PatientBSubjet.next(data);
  }
  public getPatientsBSubjectValue(){
    return this.PatientBSubjet.getValue();
  }

  
  public add(patient){
    let path = this.host+"general/addPatient";
    return this.http.post(path, patient);
  }

  public getPatientByCode(code){
    let path = this.host+"PatientsByCode/"+code;
    return this.http.get<Patient>(path);
  }


  uploadFiche(file: any, id: any) {
    let formData: FormData = new FormData();
    formData.append('file', file);
    //PREP THE REQUEST FORM DATA

    const req = new HttpRequest('POST', this.host+'general/uploadDocument/'+id, formData, {
      reportProgress: true, //REPORT PROGRESS FOR VISUAL PROGRESS BAR
      responseType: "text" // THIS DEFAULTS TO JSON, SET IT TO TEXT
    });

    return this.http.request(req);
  }
  
}
