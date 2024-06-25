import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { v4 as uuidv4 } from 'uuid'
import { Patient } from './types'

type PatientState = {
    patients: Patient[]
    activeId: Patient['id'] | null
    fetchPatients: () => Promise<void>
    addPatient: (data: Omit<Patient, 'id'>) => Promise<void>
    deletePatient: (id: Patient['id']) => void
    getPatientById: (id: Patient['id']) => void
    updatePatient: (data: Omit<Patient, 'id'>) => void
}

const API_URL = 'http://localhost:8080/api/pacientes';

export const usePatientStore = create<PatientState>()(
    devtools(
        persist(
            (set) => ({
                patients: [],
                activeId: null,

                fetchPatients: async () => {
                    try {
                        const response = await fetch(API_URL);
                        const data = await response.json();
                        set({ patients: data });
                    } catch (error) {
                        console.error('Error fetching patients:', error);
                    }
                },

                addPatient: async (data) => {
                    const newPatient = { ...data, id: uuidv4() };
                    try {
                        const response = await fetch(API_URL, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(newPatient),
                        });
                        const savedPatient = await response.json();
                        set((state) => ({
                            patients: [...state.patients, savedPatient],
                        }));
                    } catch (error) {
                        console.error('Error adding patient:', error);
                    }
                },

                deletePatient: async (id) => {
                    try {
                        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });

                    } catch (error) {
                        console.error('Error deleting patient:', error);
                    }
                },

                getPatientById: (id) => {
                    set(() => ({
                        activeId: id,
                    }));
                },

                updatePatient: async (data) => {
                    const { activeId } = usePatientStore.getState();
                    if (!activeId) return;
                    const updatedPatient = { ...data, id: activeId };
                    try {
                        const response = await fetch(`${API_URL}/${activeId}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(updatedPatient),
                        });
                        const savedPatient = await response.json();
                        set((state) => ({
                            patients: state.patients.map(patient =>
                                patient.id === activeId ? savedPatient : patient
                            ),
                            activeId: null,
                        }));
                    } catch (error) {
                        console.error('Error updating patient:', error);
                    }
                },
            }),
            {
                name: 'patient-storage',
            }
        )
    )
);
