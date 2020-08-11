export class Pais {
  public name: string;
  public infectados: number;
  public recuperados: number;
  public fallecidos: number;
  public idPais?: number;

  constructor(
    name: string,
    infectados: number,
    recuperados: number,
    fallecidos: number
  ) {
    //idPais?: number) {
    this.name = name;
    this.infectados = infectados;
    this.recuperados = recuperados;
    this.fallecidos = fallecidos;
    //  this.idPais = idPais;
  }
}
