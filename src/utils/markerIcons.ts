import Leaflet from "leaflet";

import locationMarkedImg from "../assets/location-marker.svg";
import favoriteLocationMarkedImg from "../assets/favorite-location-marker.svg";
import currentLocationMarkedImg from "../assets/current-location-marker.svg";

export const locationMarkerIcon = Leaflet.icon({
  iconUrl: locationMarkedImg,
  iconSize: [45, 45],
  iconAnchor: [23, 45],
  popupAnchor: [0, -35],
});

export const favoriteLocationMarkerIcon = Leaflet.icon({
  iconUrl: favoriteLocationMarkedImg,
  iconSize: [45, 45],
  iconAnchor: [23, 45],
  popupAnchor: [0, -35],
});

export const currentLocationMarkerIcon = Leaflet.icon({
  iconUrl: currentLocationMarkedImg,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  popupAnchor: [0, 0],
});
