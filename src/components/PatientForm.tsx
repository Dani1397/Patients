import { useState } from "react";
import { useForm } from "react-hook-form";
import Error from "./Error";
import { usePatientStore } from "../store";
import AddressModal from "./AddressModal";

export default function PatientForm() {
  const addPatient = usePatientStore((state) => state.addPatient);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [address, setAddress] = useState(null);

  const registerPatient = (data) => {
    const patientData = { ...data, patientAddress: address };
    addPatient(patientData);
    reset();
    setAddress(null);
  };

  const handleSaveAddress = (data) => {
    setAddress(data);
  };

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

      <p className="text-lg mt-5 text-center mb-10">
        Añade Pacientes y <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      <form
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
        noValidate
        onSubmit={handleSubmit(registerPatient)}
      >
        <div className="mb-5">
          <label htmlFor="patientName" className="text-sm uppercase font-bold">
            Paciente
          </label>
          <input
            id="patientName"
            className="w-full p-3  border border-gray-100"
            type="string"
            placeholder="Nombre del Paciente"
            {...register("patientName", {
              required: "El nombre del paciente es obligatorio",
            })}
          />
          {errors.patientName && <Error>{errors.patientName?.message?.toString()}</Error>}
        </div>

        <div className="mb-5">
          <label htmlFor="patienteEmail" className="text-sm uppercase font-bold">
            Email
          </label>
          <input
            id="patienteEmail"
            className="w-full p-3  border border-gray-100"
            type="email"
            placeholder="Email del Paciente"
            {...register("patienteEmail", {
              required: "El Email es Obligatorio",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email No Válido",
              },
            })}
          />
          {errors.patienteEmail && <Error>{errors.patienteEmail?.message.toString()}</Error>}
        </div>

        <div className="mb-5">
          <label htmlFor="patientAddress" className="text-sm uppercase font-bold">
            Domicilio
          </label>
          <button
            type="button"
            className="w-full p-3 border border-gray-100 bg-indigo-600 text-white rounded"
            onClick={() => setIsModalOpen(true)}
          >
            Agregar Domicilio
          </button>
          {address && (
            <p className="mt-2 text-gray-700">{`${address.calle}, ${address.numero}, ${address.localidad}, ${address.provincia}`}</p>
          )}
        </div>

        <div className="mb-5">
          <label htmlFor="patientApointment" className="text-sm uppercase font-bold">
            Fecha De la Cita
          </label>
          <input
            id="patientApointment"
            className="w-full p-3  border border-gray-100"
            type="date"
            {...register("patientApointment", {
              required: "La fecha de la cita es obligatoria",
            })}
          />
          {errors.patientApointment && <Error>{errors.patientApointment?.message}</Error>}
        </div>

        <div className="mb-5">
          <label htmlFor="symptoms" className="text-sm uppercase font-bold">
            Síntomas
          </label>
          <textarea
            id="symptoms"
            className="w-full p-3  border border-gray-100"
            placeholder="Síntomas del paciente"
          ></textarea>
        </div>

        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
          value="Guardar Paciente"
        />
      </form>

      <AddressModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveAddress}
      />
    </div>
  );
}
