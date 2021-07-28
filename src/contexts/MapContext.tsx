import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export type PlaceType = {
  id: number;
  postalCode: number;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  favorite: boolean;
};

type Position = {
  latitude: number;
  longitude: number;
};

type MapContextData = {
  currentPosition: Position;
  savedPlaces: PlaceType[];
  specificSavedPlaceIndex: number | undefined;
  setSpecificSavedPlaceIndex: (index: number | undefined) => void;
  getSavedPlaceById: (placeId: number) => PlaceType | undefined;
  getFavoritePlaces: () => PlaceType[];
  addSavedPlace: (
    postalCode: number,
    street: string,
    neighborhood: string,
    city: string,
    state: string,
    latitude: number,
    longitude: number
  ) => void;
  setFavoriteInSavedPlace: (placeId: number, favorite: boolean) => void;
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

  const [savedPlaces, setSavedPlaces] = useState<PlaceType[]>([]);

  const [specificSavedPlaceIndex, setSpecificSavedPlaceIndex] =
    useState<number>();

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

  useEffect(() => {
    if (savedPlaces.length === 0) setSpecificSavedPlaceIndex(undefined);
  }, [savedPlaces]);

  function addSavedPlace(
    postalCode: number,
    street: string,
    neighborhood: string,
    city: string,
    state: string,
    latitude: number,
    longitude: number
  ) {
    function generateID() {
      return (
        savedPlaces.reduce((max, item) => {
          if (item.id > max) max = item.id;
          return max;
        }, 0) + 1
      );
    }

    setSavedPlaces([
      ...savedPlaces,
      {
        postalCode,
        street,
        neighborhood,
        city,
        state,
        latitude,
        longitude,
        id: generateID(),
        favorite: false,
      },
    ]);
  }

  function getSavedPlaceById(placeId: number) {
    return savedPlaces.find((item) => item.id === placeId);
  }

  function getFavoritePlaces() {
    return savedPlaces.filter((item) => item.favorite);
  }

  function setFavoriteInSavedPlace(placeId: number, favorite: boolean) {
    setSavedPlaces(
      savedPlaces.map((item) => {
        if (item.id === placeId) {
          return { ...item, favorite };
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
        specificSavedPlaceIndex,
        setSpecificSavedPlaceIndex,
        getSavedPlaceById,
        getFavoritePlaces,
        addSavedPlace,
        setFavoriteInSavedPlace,
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
