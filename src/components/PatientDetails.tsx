import { Patient } from "../types";
import PatientDetailItem from "./PatientDetailItem";

type PatientDetailsProps = {
  patient: Patient;
};

export default function PatientDetails({ patient }: PatientDetailsProps) {
  return (
    <div className="mx-5 my-10 px-5 py-10 bg-white shadow-md rounded-xl">
      <PatientDetailItem label="ID" data={patient.id.toString()} />
      <PatientDetailItem label="Nombre" data={patient.nombre} />
      <PatientDetailItem label="Apellido" data={patient.apellido} />
      <PatientDetailItem label="Cedula" data={patient.cedula} />
      <PatientDetailItem label="Email" data={patient.email} />
      <PatientDetailItem label="Domicilio" data={patient.domicilio.toString()} />

      <PatientDetailItem
        label="Fecha de la cita"
        data={patient.fechaIngreso.toString()}
      />

      <div className="flex justify-between mt-10">
        <button className=" py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg">
          Editar
        </button>
        <button className=" py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg">
          Eliminar
        </button>
      </div>
    </div>
  );
}
