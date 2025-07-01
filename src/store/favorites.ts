import { create } from "zustand";
import type { Property } from "../interfaces/Property";

interface FavoritesState {
  favorites: Property[];
  toggleFavorite: ( property: Property ) => void;
  isFavorite: ( id: number ) => boolean;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: JSON.parse( localStorage.getItem("favoritos") || "[]" ),

  toggleFavorite: ( property ) => {
    const favorites = get().favorites;
    const exist = favorites.some( fav => fav.id === property.id );
    const newFavorites = exist
      ? favorites.filter( fav => fav.id !== property.id )
      : [ ...favorites, property ];

    localStorage.setItem("favoritos", JSON.stringify( newFavorites ));
    set({ favorites: newFavorites });
  },

  isFavorite: ( id ) => get().favorites.some( fav => fav.id === id ),
}));
