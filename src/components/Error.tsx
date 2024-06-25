export default function Error({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-center my-4 bg-red-300 text-red-700 font-bold p-3 uppercase text-sm">
      {children}
    </p>
  );
}
