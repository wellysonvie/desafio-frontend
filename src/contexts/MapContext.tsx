import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type Position = {
  latitude: number;
  longitude: number;
};

type MapContextData = { currentPosition: Position };

type MapContextProviderProps = {
  children: ReactNode;
};

export const MapContext = createContext({} as MapContextData);

export function MapContextProvider({ children }: MapContextProviderProps) {
  const [currentPosition, setCurrentPosition] = useState<Position>({
    latitude: -5.090459,
    longitude: -42.811305,
  });

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

  return (
    <MapContext.Provider value={{ currentPosition }}>
      {children}
    </MapContext.Provider>
  );
}

export const useMapContext = () => {
  return useContext(MapContext);
};
