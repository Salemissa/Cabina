import { DatePipe } from '@angular/common';
import { HttpEventType } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import { ActivatedRoute } from '@angular/router';
import { Medecin } from 'src/app/Model/medecin';
import { Patient } from 'src/app/Model/Patient';
import { Visite } from 'src/app/Model/visite';
import { PatientService } from 'src/app/services/patient.service';
import { VisiteService } from 'src/app/services/visite.service';
export interface Section {
  name: string;
  updated: Date;
}
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit,  AfterViewInit {
  folders: Section[] = [
    {
      name: 'Diagnostics retennus',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Ordonnance de sortie',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    }
  ];
  notes: Section[] = [
    {
      name: 'Vacation Itinerary',
      updated: new Date('2/20/16'),
    },
    {
      name: 'Kitchen Remodel',
      updated: new Date('1/18/16'),
    }
  ];
  VisiteForm : FormGroup;
  PatientId: number;
  patient:Patient;
  visite:Visite;
  visites:Visite[];
  album:any = [];
  displayedColumns: string[] = ['id','date', 'type', 'info'];
  dataSource: MatTableDataSource<Visite>;
  @ViewChild(MatPaginator,{static :true}) paginator: MatPaginator;
  @ViewChild(MatSort,{static :true}) sort: MatSort;
  VisiteId: any;
  Ordonnance: File;
  Analysee: any;
  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private patientService:PatientService,
    public visiteService:VisiteService,
  
    ) {
      const visit=new Array;
      this.dataSource = new MatTableDataSource(visit);

      this.album.push({'src':'https://via.placeholder.com/500','caption':'Imag1','thumb':'https://via.placeholder.com/150'});

      this.album.push({'src':'https://via.placeholder.com/500','caption':'Imag1','thumb':'https://via.placeholder.com/150'});


    
      
     }

  ngOnInit() {

    this.PatientId = this.activatedRoute.params["_value"].id;
    this.getPatientByCode( this.PatientId);
    this.getVisitePatientByCode( this.PatientId);
   
    
    this.buildLoginForm();
  }

  ngAfterViewInit() {
    //this.getPatients();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
   
  }
  

  buildLoginForm(){
    this.VisiteForm = this.formBuilder.group({
      date: [new Date(), Validators.required],
      type: ['', Validators.required],
      analyse: ['', Validators.required],
      ordonnance: ['', Validators.required],
      objet: ['', Validators.required]
      
         
    });
  }

  get f() {
    return this.VisiteForm.controls;
  }

  onSubmit() {

    if (this.VisiteForm.invalid){
      console.log("FORM INVALD");
      return;
    }

    
    const patient=new Patient();
    const medecin=new Medecin();
   patient.id=this.PatientId;
   medecin.id=1;
   const visite=Visite.createVisit(patient,medecin,this.VisiteForm.value['date'],this.VisiteForm.value['type'],500,this.VisiteForm.value['objet'])
    this.saveVisite(visite);
  
   
   /*
    const pipe = new DatePipe('en-US');
    const now = Date.now();
    const myFormattedDate = pipe.transform(now, 'short');
    console.log(myFormattedDate)
   */
  }

  getPatientByCode(id:number){
    this.patientService.getResource("general/PatientsByCode/"+id)
        .subscribe(data => {
          this.patient = data;
          console.log(this.patient)
    }, 
    err => {
      console.error(err);
    });
  }

  saveVisite(visite: Visite) {
    this.visiteService.addVisite(visite)
    .subscribe(
      data => {
      if(data){
        this.VisiteId=data;
        let formData:FormData = new FormData();
        
        this.Ordonnance= this.VisiteForm.value['ordonnance'].files[0];
        this.Analysee=this.VisiteForm.value['analyse'].files[0];
        if(this.Ordonnance){
        this.uploadDoc(data,this.Ordonnance,"Ordonnance")
      }
      if(this.Analysee){
        this.uploadDoc(data,this.Analysee,"Analyse")
      }
      }
        let el = document.getElementById("close");
        el.click();
        console.log(data)
        this.getVisitePatientByCode(this.PatientId)

      },
      error => {
     
      
        console.log(error)
        
      });
  }

  getVisitePatientByCode(id:number){
    this.visiteService.getResource("general/visitesByCodePatient/"+id)
        .subscribe(data => {
         
          this.dataSource.data =data 
         
    }, 
    err => {
      console.error(err);
    });


   
  }


 
  uploadDoc(VisiteId,file,type) {
    this.visiteService.uploadDocument(file, VisiteId,type)
      .subscribe(result => {
        if (result.type === HttpEventType.UploadProgress) {
          //this.progress = Math.round(100 * result.loaded/ result.total);
        } else {
          // alert("upload avec succees.");
        }
      }, err => {
        alert("Probleme de chargement " + JSON.parse(err.error).message);
      });
  }


  onSelectOrdonnance(event) {
    //console.log(event.target.files);
    
   // console.log(this.Ordonnance)
    if (event.target.files.item(0)) {

      let image: File = event.target.files.item(0);
     //image.type.match("image/*"
        //this.Ordonnance = image;
        this.Ordonnance=this.VisiteForm.value['objet'];
        console.log(this.Ordonnance)
     
        alert("Le fichier que vous avez choisi n'est pas une image.");
      }
    }
  
    onSelectVisite(visit){
      this.visite=visit;
      console.log(visit.visiteDocs)
    }


    getTS() {
      return  Date.now();
    }

   
}
 
