import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MedecinService } from 'src/app/services/medecin.service';

@Component({
  selector: 'app-medecins',
  templateUrl: './medecins.component.html',
  styleUrls: ['./medecins.component.scss']
})
export class MedecinsComponent implements OnInit {
  medecins=[];
  
  MedecinForm : FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private medecinService:MedecinService
    ) { }

  ngOnInit() {
    this.getaMedecins()
    this.buildLoginForm();
  }

  

  

  


  buildLoginForm(){
    this.MedecinForm = this.formBuilder.group({
      
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      tel: ['', Validators.required],
      sexe:['',Validators.required],
      cin: ['', Validators.required],
      email: ['', Validators.required],
      //email: ['', Validators.required],
      specialite: ['', Validators.required]
      
         
    });
  }

  get f() {
    return this.MedecinForm.controls;
  }

  onSubmit() {
   // console.log(this.PatientForm.value),
   if (this.MedecinForm.invalid){
    console.log("FORM INVALD");
    return;
  }
  //this.loading = true;
  this.saveMedecin();

  }
  saveMedecin() {
    this.medecinService.addMedecin(this.MedecinForm.value)
    .subscribe(
      data => {
        let el = document.getElementById("close");
        el.click();
        this.getaMedecins();
        console.log(data)
        

      },
      error => {
     
      
        console.log(error)
        
      });
  }


  getaMedecins(){
    this.medecinService.getResource("general/allMedecins")
        .subscribe(data => {
          this.medecins = data;
          this.medecinService.setMedecinsSubjectValue(this.medecins);
    }, 
    err => {
      console.error(err);
    });

    }
  

  

}
