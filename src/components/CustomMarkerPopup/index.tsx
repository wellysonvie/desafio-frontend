import { Popup } from "react-leaflet";
import { PlaceType } from "../../contexts/MapContext";

import styles from "./styles.module.scss";

type MarkerPopupProps = {
  data: PlaceType;
};

const MarkerPopup = ({ data }: MarkerPopupProps) => {
  return (
    <Popup
      className={styles.markerPopup}
      closeButton={false}
      minWidth={288}
      maxWidth={288}
    >
      <div className={styles.description}>
        <h1>{data.postalCode}</h1>
        <p>{data.street}</p>
        <p>{data.neighborhood}</p>
        <p>
          {data.city}, {data.state}
        </p>
      </div>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={`https://www.google.com/maps/dir/?api=1&destination=${data.latitude},${data.longitude}`}
      >
        Ver rotas no Google Maps
      </a>
    </Popup>
  );
};

export default MarkerPopup;
