import { useEffect, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

import { useMapContext } from "../../contexts/MapContext";
import SearchBar from "../SearchBar";
import CustomMarkerPopup from "../CustomMarkerPopup";
import {
  currentLocationMarkerIcon,
  locationMarkerIcon,
  favoriteLocationMarkerIcon,
} from "../../utils/markerIcons";

import "leaflet/dist/leaflet.css";
import styles from "./styles.module.scss";

const MapAreaMarkers = () => {
  const { currentPosition, savedPlaces, specificSavedPlaceIndex } =
    useMapContext();
  const map = useMap();

  const mapFlyToPosition = useCallback(
    (latitude: number, longitude: number) => {
      map.flyTo([latitude, longitude], 13);
    },
    [map]
  );

  useEffect(() => {
    mapFlyToPosition(currentPosition.latitude, currentPosition.longitude);
  }, [currentPosition, map, mapFlyToPosition]);

  useEffect(() => {
    if (savedPlaces.length > 0) {
      const lastItem = savedPlaces[savedPlaces.length - 1];
      mapFlyToPosition(lastItem.latitude, lastItem.longitude);
    } else {
      mapFlyToPosition(currentPosition.latitude, currentPosition.longitude);
    }
  }, [savedPlaces, map, mapFlyToPosition, currentPosition]);

  useEffect(() => {
    if (specificSavedPlaceIndex !== undefined) {
      mapFlyToPosition(
        savedPlaces[specificSavedPlaceIndex].latitude,
        savedPlaces[specificSavedPlaceIndex].longitude
      );
    }
  }, [savedPlaces, specificSavedPlaceIndex, mapFlyToPosition]);

  if (specificSavedPlaceIndex !== undefined) {
    return (
      <Marker
        icon={
          savedPlaces[specificSavedPlaceIndex].favorite
            ? favoriteLocationMarkerIcon
            : locationMarkerIcon
        }
        position={[
          savedPlaces[specificSavedPlaceIndex].latitude,
          savedPlaces[specificSavedPlaceIndex].longitude,
        ]}
      >
        <CustomMarkerPopup data={savedPlaces[specificSavedPlaceIndex]} />
      </Marker>
    );
  }

  return (
    <>
      <Marker
        icon={currentLocationMarkerIcon}
        position={[currentPosition.latitude, currentPosition.longitude]}
      >
        <Popup closeButton={false}>Sua localiza????o atual</Popup>
      </Marker>

      {savedPlaces.map((item) => (
        <Marker
          key={item.id}
          icon={item.favorite ? favoriteLocationMarkerIcon : locationMarkerIcon}
          position={[item.latitude, item.longitude]}
        >
          <CustomMarkerPopup data={item} />
        </Marker>
      ))}
    </>
  );
};

const MapArea = () => {
  const { currentPosition } = useMapContext();

  return (
    <section className={styles.mapArea}>
      <SearchBar />
      <MapContainer
        className={styles.mapContainer}
        center={[currentPosition.latitude, currentPosition.longitude]}
        zoom={13}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapAreaMarkers />
      </MapContainer>
    </section>
  );
};

export default MapArea;
