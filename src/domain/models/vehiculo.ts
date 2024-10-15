export class Vehiculo {

    id?: number
    marca: string
    modelo: string
    year: number;

    constructor (infoVehiculo: {

        id?: number
        marca: string
        modelo: string
        year: number
    }) {
        this.id =  infoVehiculo.id;
        this.marca = infoVehiculo.marca;
        this.modelo = infoVehiculo.modelo;
        this.year = infoVehiculo.year;
    }

}