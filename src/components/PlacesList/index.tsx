import { PlaceType } from "../../contexts/MapContext";
import PlacesListItem from "../PlacesListItem";
import styles from "./styles.module.scss";

type PlacesListProps = {
  data: PlaceType[];
};

const PlacesList = ({ data }: PlacesListProps) => {
  if (data.length === 0) {
    return (
      <div className={styles.emptyList}>
        <p>Nenhum item adicionado.</p>
      </div>
    );
  }

  return (
    <ul className={styles.placesList}>
      {data.map((item) => (
        <PlacesListItem key={item.id} data={item} />
      ))}
    </ul>
  );
};

export default PlacesList;
