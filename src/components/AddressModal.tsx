import { useForm } from "react-hook-form";

export default function AddressModal({ isOpen, onClose, onSave }) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const saveAddress = (data) => {
    onSave(data);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-5 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">Agregar Domicilio</h2>
        <form onSubmit={handleSubmit(saveAddress)}>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="calle">
              Calle
            </label>
            <input
              id="calle"
              type="text"
              {...register("calle", { required: "La calle es obligatoria" })}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.calle && <p className="text-red-500 text-sm">{errors.calle.message.toString()}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="numero">
              Número
            </label>
            <input
              id="numero"
              type="number"
              {...register("numero", { required: "El número es obligatorio" })}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.numero && <p className="text-red-500 text-sm">{errors.numero.message.toString()}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="localidad">
              Localidad
            </label>
            <input
              id="localidad"
              type="text"
              {...register("localidad", { required: "La localidad es obligatoria" })}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.localidad && <p className="text-red-500 text-sm">{errors.localidad.message?.toString()}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="provincia">
              Provincia
            </label>
            <input
              id="provincia"
              type="text"
              {...register("provincia", { required: "La provincia es obligatoria" })}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.provincia && <p className="text-red-500 text-sm">{errors.provincia.message.toString()}</p>}
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="mr-2 bg-gray-300 text-gray-700 px-4 py-2 rounded">Cancelar</button>
            <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
