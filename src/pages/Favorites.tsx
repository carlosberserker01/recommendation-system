import { useFavoritesStore } from "../store/favorites";
import PropertyCard from "../components/PropertyCard";

export default function Favorites() {
  const favorites = useFavoritesStore( state => state.favorites );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-orange-500">Propiedades Favoritas</h1>
      {favorites.length === 0 ? (
        <p className="text-gray-600">No has marcado ninguna propiedad aún.</p>
      ) : (
        <div className="flex flex-wrap gap-6 justify-center">
          {favorites.map( fav => (
            <PropertyCard 
              key={ fav.id } 
              property={ fav } 
            />
          ))}
        </div>
      )}
    </div>
  );
}
