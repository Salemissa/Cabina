import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Visite } from '../Model/visite';

@Injectable({
  providedIn: 'root'
})
export class VisiteService {
  public host = environment.apiUrl;
  private VisiteBSubjet = new BehaviorSubject<[Visite]>(null);
  constructor(private http:HttpClient) { }

  public getResource(url):Observable<any> {
  
    return this.http.get<Visite>(this.host+url);
  }


  public getVisite(): Observable<[Visite]> {
    return this.VisiteBSubjet.asObservable();
  }

  public setPatientsSubjectValue(data) {
    console.info("setLangueSubjectValue subject next: ", data)
    this.VisiteBSubjet.next(data);
  }
  public getPatientsBSubjectValue(){
    return this.VisiteBSubjet.getValue();
  }

  
  public addVisite(visite){
    let path = this.host+"general/addVisite";
    return this.http.post(path, visite);
  }

  public getVisiteByCode(code){
    let path = this.host+"visitesByCodePatient//"+code;
    return this.http.get<Visite>(path);
  }


  uploadDocument(file: File, idvisite,type): Observable<HttpEvent<{}>>{
    let formData: FormData = new FormData();
    formData.append('file', file);
    //PREP THE REQUEST FORM DATA

    const req = new HttpRequest('POST', this.host+'general//uploadDocument/'+idvisite+'/'+type, formData, {
      reportProgress: true, //REPORT PROGRESS FOR VISUAL PROGRESS BAR
      responseType: "text" // THIS DEFAULTS TO JSON, SET IT TO TEXT
    });

    return this.http.request(req);
  }
  
}
