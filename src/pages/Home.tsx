import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { properties } from '../db/properties_mock_100_clean';
import PropertyCard from '../components/PropertyCard';
import { normalizer } from '../utils/normalizer';

export default function Home() {

  const [searchInput, setSearchInput] = useState('')

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "auto" });
    }, 200);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-orange-500">Propiedades disponibles</h1>
      <div className='flex flex-col justify-between px-6 md:flex-row md:items-center mb-6 gap-6'>
        <input
          type="text"
          placeholder="Buscar por título, ciudad o tipo..."
          className="px-4 py-2 border border-gray-300 rounded-md w-full max-w-md"
          value={ searchInput}
          onChange={({ target }) => setSearchInput( target.value )}
        />
        <Link to="/favoritos" className="text-blue-500 hover:underline text-center inline">
          Ver propiedades favoritas
        </Link>
      </div>
      <div className="flex flex-wrap gap-6 justify-center">
        {properties
          .filter( p => {
            const text = searchInput.toLowerCase();
            return (
              normalizer( p.titulo ).includes( text ) ||
              normalizer ( p.ciudad ).includes( text ) ||
              normalizer( p.tipo ).includes( text )
            );
          })
          .map( property => (
            <PropertyCard 
              key={ property.id } 
              property={ property } 
            />
          ))
        }
      </div>
    </div>
  );
}
