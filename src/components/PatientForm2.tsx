import React, { useState } from 'react';
import { Patient, Domicilio } from '../types';

interface AddPatientFormProps {
  createPatient: (patient: Omit<Patient, 'id'>) => void;
}

const AddPatientForm: React.FC<AddPatientFormProps> = ({ createPatient }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [cedula, setCedula] = useState('');
  const [email, setEmail] = useState('');
  const [domicilio, setDomicilio] = useState<Domicilio>({
    calle: '',
    ciudad: '',
    provincia: '',
    codigoPostal: ''
  });
  const [fechaIngreso, setFechaIngreso] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPatient = {
      nombre,
      apellido,
      cedula,
      email,
      domicilio,
      fechaIngreso: new Date(fechaIngreso)
    };
    createPatient(newPatient);
    setNombre('');
    setApellido('');
    setCedula('');
    setEmail('');
    setDomicilio({ calle: '', ciudad: '', provincia: '', codigoPostal: '' });
    setFechaIngreso('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg py-10 px-5 mb-10">
      <div className="mb-5">
        <label className="text-sm uppercase font-bold" htmlFor="nombre">
          Nombre
        </label>
        <input
          type="text"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full p-3  border border-gray-100"
        />
      </div>
      <div className="mb-5">
        <label className="text-sm uppercase font-bold" htmlFor="apellido">
          Apellido
        </label>
        <input
          type="text"
          id="apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          className="w-full p-3  border border-gray-100"
        />
      </div>
      <div className="mb-5">
        <label className="text-sm uppercase font-bold" htmlFor="cedula">
          Cédula
        </label>
        <input
          type="text"
          id="cedula"
          value={cedula}
          onChange={(e) => setCedula(e.target.value)}
          className="w-full p-3  border border-gray-100"
        />
      </div>
      <div className="mb-5">
        <label className="text-sm uppercase font-bold" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3  border border-gray-100"
        />
      </div>
      <div className="mb-5">
        <label className="text-sm uppercase font-bold" htmlFor="calle">
          Calle
        </label>
        <input
          type="text"
          id="calle"
          value={domicilio.calle}
          onChange={(e) => setDomicilio({ ...domicilio, calle: e.target.value })}
          className="w-full p-3  border border-gray-100"
        />
      </div>
      <div className="mb-5">
        <label className="text-sm uppercase font-bold" htmlFor="ciudad">
          Ciudad
        </label>
        <input
          type="text"
          id="ciudad"
          value={domicilio.ciudad}
          onChange={(e) => setDomicilio({ ...domicilio, ciudad: e.target.value })}
          className="w-full p-3  border border-gray-100"
        />
      </div>
      <div className="mb-5">
        <label className="text-sm uppercase font-bold" htmlFor="provincia">
          Provincia
        </label>
        <input
          type="text"
          id="provincia"
          value={domicilio.provincia}
          onChange={(e) => setDomicilio({ ...domicilio, provincia: e.target.value })}
          className="w-full p-3  border border-gray-100"
        />
      </div>
      <div className="mb-5">
        <label className="text-sm uppercase font-bold" htmlFor="codigoPostal">
          Código Postal
        </label>
        <input
          type="text"
          id="codigoPostal"
          value={domicilio.codigoPostal}
          onChange={(e) => setDomicilio({ ...domicilio, codigoPostal: e.target.value })}
          className="w-full p-3  border border-gray-100"
        />
      </div>
      <div className="mb-5">
        <label className="text-sm uppercase font-bold" htmlFor="fechaIngreso">
          Fecha de Ingreso
        </label>
        <input
          type="date"
          id="fechaIngreso"
          value={fechaIngreso}
          onChange={(e) => setFechaIngreso(e.target.value)}
          className="w-full p-3  border border-gray-100"
        />
      </div>
      
      <button
        type="submit"
        className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
      >
        Agregar Paciente
      </button>
    </form>
  );
};

export default AddPatientForm;
