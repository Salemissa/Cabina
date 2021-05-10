import { Medecin } from "./medecin";
import { Patient } from "./Patient";

export  class Visite {
     
    public id: Number;
    public motif:number;
    public medecin:Medecin;
    public patient:Patient;
    public type:String
    public objet;
    public date:Date;

    constructor(){
       
    }

static createVisit(patient,medecin,date,type,motif,objet): Visite {
     
      return {
        id:0,
       patient:patient,
       medecin: medecin,
        date: date,
        motif:motif,
        type:type,
        objet:objet
       
      }

    }
  } 