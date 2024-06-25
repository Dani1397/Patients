// usePatients.ts
import { useState, useEffect } from 'react';
import { Patient } from './types/index';

const API_URL = 'http://localhost:8080/api/pacientes';

const usePatients = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Error al obtener los pacientes');
      }
      const data: Patient[] = await response.json();
      setPatients(data);
      setLoading(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error desconocido');
      }
      setLoading(false);
    }
  };

  const createPatient = async (patient: Omit<Patient, 'id'>) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(patient),
      });
      if (!response.ok) {
        throw new Error('Error al crear el paciente');
      }
      const newPatient: Patient = await response.json();
      setPatients([...patients, newPatient]);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error desconocido');
      }
    }
  };

  const updatePatient = async (id: number, updatedPatient: Patient) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPatient),
      });
      if (!response.ok) {
        throw new Error('Error al actualizar el paciente');
      }
      const updated = await response.json();
      setPatients(patients.map((patient) => (patient.id === id ? updated : patient)));
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error desconocido');
      }
    }
  };

  const deletePatient = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error al eliminar el paciente');
      }
      setPatients(patients.filter((patient) => patient.id !== id));
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error desconocido');
      }
    }
  };

  return { patients, loading, error, createPatient, updatePatient, deletePatient };
};

export default usePatients;
