import { useEffect, useState } from 'react';
import { getRecommendations } from '../utils/getRecommendations';
import { properties } from '../db/properties_mock_100_clean';
import Recommendations from './Recomendations';
import { useFavoritesStore } from '../store/favorites';
import type { Property } from '../interfaces/Property';

interface Props {
  property: Property;
}

export default function PropertyCard( { property }: Props ) {
  const [similars, setSimilars] = useState<Property[]>([]);
  const [border, setBorder] = useState(false);

  const toggleFavorite = useFavoritesStore( state => state.toggleFavorite );
  const isFavorite = useFavoritesStore( state => state.isFavorite( property.id ) );

  useEffect(() => {
    const results = getRecommendations( property, properties );
    setSimilars( results );
  }, [ property ]);

  useEffect(() => {
    const handler = (e: CustomEvent<{ id: number }>) => {
      if (document.visibilityState !== "visible") return;

      if ( e.detail.id === property.id ) {
        setBorder( true );
        setTimeout( () => setBorder(false), 3000 );
      }
    };

    window.addEventListener("border-property", handler as EventListener);

    return () => {
      window.removeEventListener("border-property", handler as EventListener);
    };
  }, [ property.id ]);

  return (
    <div id={`prop-${ property.id }`} className={`relative bg-white shadow-md hover:shadow-lg rounded-lg p-4 w-80 transition-transform duration-300 hover:scale-105 flex flex-col justify-between ${ border ? "ring-4 ring-yellow-400" : "" }`}>
      <button
        onClick={ () => toggleFavorite( property ) }
        className={`absolute top-2 right-2 text-xl ${ isFavorite ? "text-red-500" : "text-gray-400" }`}
        title="Marcar como favorito"
      >
        { isFavorite ? "❤️" : "🤍" }
      </button>
      <img
        src={ property.imagen }
        alt={ property.titulo }
        className="w-full h-40 object-cover rounded-md"
      />
      <div>
        <h2 className="text-lg font-semibold mt-2 text-orange-500">{ property.titulo }</h2>
        <p className="text-gray-700">{ property.tipo }</p>
        <p className="text-gray-700">{ property.ciudad }</p>
        <p className="text-gray-700">${ property.precio.toLocaleString() }</p>
        <p className="text-gray-700">{ property.ambientes } ambientes</p>
        <p className="text-gray-700">{ property.metros_cuadrados } m²</p>
      </div>

      <Recommendations 
        similars={ similars }
      />
    </div>
  );
}