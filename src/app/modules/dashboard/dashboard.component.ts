import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { arrayMax } from 'highcharts';
import { Patient } from 'src/app/Model/Patient';
import { PatientService } from 'src/app/services/patient.service';
import { LoaderService } from '../loader.service';
/*export  interface UserData {
  id: string;
  code:String
  name: string;
  tel: string;
  cin: string;

}
*/
/** Constants used to fill up our data base. */
const Code: string[] = [
  'P1', 'P2', 'P3', 'P4', 'P5', 'P6','P7','P8'
];
const Cin: string[] = [
  '123456789', '999999991199', '11888888', '99999999', '99999999933', '999999999','990011224455','887766554433'
];
const Tel: string[] = [
  '22334455', '22334414', '33221144', '49008877', '22556677', '33226688','3626688','43226688'
];
const NAMES: string[] = [
  'Salem','Hadrami', 'Sidi', 'Ali', 'Mohamed', 'Oumar', 'Test', 'Test2'
];

const DateP: Date[] = [
  new Date('1/17/16'),new Date('1/19/16'), new Date('1/08/16'), new Date('3/17/16'), new Date('5/17/16'), new Date('1/08/16'), new Date('3/23/16'), new Date('1/17/16')
];
const DateD: Date[] = [
  new Date('7/17/2019'),new Date('9/19/2021'), new Date('5/08/2020'), new Date('1/17/18'), new Date('2/17/17'), new Date('4/08/16'), new Date('8/23/16'), new Date('5/17/16')
];

//updated: new Date('1/1/16'),

/**
 * @title Data table with sorting, pagination, and filtering.
 */

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
  loading: boolean;
  displayedColumns: string[] = ['id','code', 'nom', 'tel', 'cin','datep','dated',"test"];
  dataSource: MatTableDataSource<Patient>;

  @ViewChild(MatPaginator,{static :true}) paginator: MatPaginator;
  @ViewChild(MatSort,{static :true}) sort: MatSort;
  PatientForm : FormGroup;
  users: Patient[];
  constructor(private formBuilder: FormBuilder,
    public loaderService: LoaderService,
    private patientService:PatientService,
    private route: ActivatedRoute,
    private router: Router,) {
    this.loaderService.isLoading.subscribe((v) => {
      this.loading = v;
    });
    const users =new Array;
    this.dataSource = new MatTableDataSource(users);
    this.getPatients();
  
   
  }
  ngOnInit() {
  
    this.buildLoginForm();

    if(!localStorage.getItem("login")){
        this.router.navigateByUrl('login')
    }
   
    
}
  ngAfterViewInit() {
    //this.getPatients();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
   
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  buildLoginForm(){
    this.PatientForm = this.formBuilder.group({
      code: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      tel: ['', Validators.required],
      age: ['', Validators.required],
      sexe:['M',Validators.required],
      cin: ['', Validators.required],
      antecedent: ['', ]
         
    });
  }
  onDeatail(id:number){
    console.log(id)
  }

 
  get f() {
    return this.PatientForm.controls;
  }

  onSubmit() {
   // console.log(this.PatientForm.value),
   if (this.PatientForm.invalid){
    console.log("FORM INVALD");
    return;
  }
  this.loading = true;
  this.savePatient();

  }

  savePatient(){
    this.patientService.add(this.PatientForm.value)
    .subscribe(
      data => {
        let el = document.getElementById("success");
        //el.click();
        setTimeout(() => {
         // this.triggerFalseClick4Close()
          this.router.navigate(["/patient/"+data]);
        });

      },
      error => {
       // this.error = "Vérifiez votre login et mot de passe ! ";
        let el = document.getElementById("success");
        //el.click();
        setTimeout(() => {
          //this.triggerFalseClick4Close()
        });
        //console.log(error)
        //this.error = error;
        this.loading = false;
        //this.loading = false;
        //this.router.navigateByUrl('/login');
      });
  }

  getPatients(){
    this.patientService.getResource("general/allPatients")
        .subscribe(data => {
          this.users = data;
          this.dataSource.data =data ;
          this.patientService.setPatientsSubjectValue(this.users);
    }, 
    err => {
      console.error(err);
    });

    }
  
}

/** Builds and returns a new User. */
function createNewUser(id: number): Patient {
  const name = NAMES[id];
  const tel=Tel[id];
  const cin=Cin[id]
  const code=Code[id]

  return {
    id: id,
    nom: name,
    tel: tel,
    cin: cin,
    code:code,
    prenom:'',
    age:23,
    sexe:"M",
    antecedent:"Test",
    datep:DateP[id],
    dated:DateD[id]
  };

}
 


  
 
