import PlacesListItem from "../PlacesListItem";
import styles from "./styles.module.scss";

const PlacesList = () => {
  const data: [] = [];

  if (data.length === 0) {
    return (
      <div className={styles.emptyList}>
        <p>Nenhum item adicionado.</p>
      </div>
    );
  }

  return (
    <ul className={styles.placesList}>
      <PlacesListItem />
      <PlacesListItem />
      <PlacesListItem />
      <PlacesListItem />
      <PlacesListItem />
      <PlacesListItem />
      <PlacesListItem />
      <PlacesListItem />
      <PlacesListItem />
      <PlacesListItem />
      <PlacesListItem />
      <PlacesListItem />
    </ul>
  );
};

export default PlacesList;
