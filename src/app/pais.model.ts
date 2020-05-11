export class Pais {
   
   public namePais: string;
    public cantInfect: number;
    public cantRecovery: number;
    public cantDead: number;
     id?: string;
    
   constructor(namePais: string, cantInfect: number, cantRecovery: number, cantDead: number) {
     this.namePais = namePais;
     this.cantInfect = cantInfect;
     this.cantRecovery = cantRecovery;
     this.cantDead = cantDead
   }
}