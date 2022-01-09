import { useState, useEffect } from "react";


export const useFavoriteUsersFetch = () => {
  const [favorites, setFavorits] = useState();

  useEffect(() => {
    storageFavorites();
  }, [favorites]);

   function storageFavorites() {
    if (!favorites) {
      setFavorits(JSON.parse(localStorage.getItem('favorites')||[]))
    }
    //json.stringify to convert js object to json
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  return {favorites, setFavorits};
};