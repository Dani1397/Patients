export type Patient = {
    id: number;
    nombre: string;
    apellido: string;
    cedula: string;
    email: string;
    domicilio: Domicilio;
    fechaIngreso: Date;
}

export type PatientDTO = {
    nombre: string;
    apellido: string;
    cedula: string;
    email: string;
    domicilio: Domicilio;
    fechaIngreso: Date;
}

export type Domicilio = {
    id: number;
    calle: string;
    numero: number;
    localidad: string;
    provincia: string;
}