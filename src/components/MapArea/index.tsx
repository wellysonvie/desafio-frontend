import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

import { useMapContext } from "../../contexts/MapContext";
import { currentLocationMarkerIcon } from "../../utils/markerIcons";

import "leaflet/dist/leaflet.css";
import styles from "./styles.module.scss";

const MapAreaMarkers = () => {
  const { currentPosition } = useMapContext();
  const map = useMap();

  useEffect(() => {
    map.flyTo(
      [currentPosition.latitude, currentPosition.longitude],
      map.getZoom()
    );
  }, [currentPosition, map]);

  return (
    <Marker
      icon={currentLocationMarkerIcon}
      position={[currentPosition.latitude, currentPosition.longitude]}
    >
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  );
};

const MapArea = () => {
  const { currentPosition } = useMapContext();

  return (
    <section className={styles.mapArea}>
      <MapContainer
        className={styles.mapContainer}
        center={[currentPosition.latitude, currentPosition.longitude]}
        zoom={14}
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
