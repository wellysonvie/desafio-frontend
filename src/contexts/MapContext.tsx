import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type Place = {
  id?: number;
  postalCode: number;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  favorite?: boolean;
};

type Position = {
  latitude: number;
  longitude: number;
};

type MapContextData = {
  currentPosition: Position;
  savedPlaces: Place[];
  getSavedPlaceById: (placeId: number) => Place | undefined;
  getFavoritePlaces: () => Place[];
  addSavedPlace: (place: Place) => void;
  favoriteSavedPlace: (placeId: number) => void;
  deleteSavedPlace: (placeId: number) => void;
};

type MapContextProviderProps = {
  children: ReactNode;
};

export const MapContext = createContext({} as MapContextData);

export function MapContextProvider({ children }: MapContextProviderProps) {
  const [currentPosition, setCurrentPosition] = useState<Position>({
    latitude: -5.090459,
    longitude: -42.811305,
  });

  const [savedPlaces, setSavedPlaces] = useState<Place[]>([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }
  }, []);

  function addSavedPlace(place: Place) {
    function generateID() {
      return (
        savedPlaces.reduce((max, item) => {
          if (item.id && item.id > max) max = item.id;
          return max;
        }, 0) + 1
      );
    }

    setSavedPlaces([
      ...savedPlaces,
      { ...place, id: generateID(), favorite: false },
    ]);
  }

  function getSavedPlaceById(placeId: number) {
    return savedPlaces.find((item) => item.id === placeId);
  }

  function getFavoritePlaces() {
    return savedPlaces.filter((item) => item.favorite);
  }

  function favoriteSavedPlace(placeId: number) {
    setSavedPlaces(
      savedPlaces.map((item) => {
        if (item.id === placeId) {
          return { ...item, favorite: true };
        }
        return item;
      })
    );
  }

  function deleteSavedPlace(placeId: number) {
    setSavedPlaces(savedPlaces.filter((item) => item.id !== placeId));
  }

  return (
    <MapContext.Provider
      value={{
        currentPosition,
        savedPlaces,
        getSavedPlaceById,
        getFavoritePlaces,
        addSavedPlace,
        favoriteSavedPlace,
        deleteSavedPlace,
      }}
    >
      {children}
    </MapContext.Provider>
  );
}

export const useMapContext = () => {
  return useContext(MapContext);
};
