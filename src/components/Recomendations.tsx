import type { Property } from "../interfaces/Property";

interface Props {
  similars: Property[];
}

export default function Recommendations({ similars }: Props) {
  if ( similars.length === 0 ) return null;

  return (
    <div className="mt-4 bg-gray-50 p-3 rounded-md border">
      <h3 className="font-semibold text-sm mb-2">Propiedades similares:</h3>
      <ul className="list-disc list-inside text-sm text-gray-700">
        {similars.map( similar => (
          <li 
            key={ similar.id } 
            className="cursor-pointer hover:text-blue-500 transition-colors"
            onClick={() => {
              const el = document.getElementById(`prop-${ similar.id }`);
              if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
              window.dispatchEvent(new CustomEvent("border-property", { detail: { id: similar.id } }));
            }}
          >
            {similar.titulo} ${similar.precio.toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
