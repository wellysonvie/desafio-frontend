import { MouseEvent, useEffect, useState } from "react";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { HiOutlineTrash } from "react-icons/hi";
import cx from "classnames";

import { PlaceType, useMapContext } from "../../contexts/MapContext";

import styles from "./styles.module.scss";

type PlacesListItemProps = {
  data: PlaceType;
};

const PlacesListItem = ({ data }: PlacesListItemProps) => {
  const {
    savedPlaces,
    setFavoriteInSavedPlace,
    deleteSavedPlace,
    specificSavedPlaceIndex,
    setSpecificSavedPlaceIndex,
  } = useMapContext();

  const [isHighlighted, setIsHighlighted] = useState<boolean>(false);

  useEffect(() => {
    setIsHighlighted(() => {
      if (
        specificSavedPlaceIndex !== undefined &&
        savedPlaces[specificSavedPlaceIndex].id === data.id
      ) {
        return true;
      }
      return false;
    });
  }, [savedPlaces, specificSavedPlaceIndex, data]);

  function handleClick() {
    if (!isHighlighted)
      setSpecificSavedPlaceIndex(
        savedPlaces.findIndex((item) => item.id === data.id)
      );
    else setSpecificSavedPlaceIndex(undefined);
  }

  function handleFavorite(event: MouseEvent) {
    event.stopPropagation();
    setFavoriteInSavedPlace(data.id, !data.favorite);
  }

  function handleDelete(event: MouseEvent) {
    event.stopPropagation();
    if (window.confirm("Excluir este item?")) {
      if (isHighlighted) setSpecificSavedPlaceIndex(undefined);
      deleteSavedPlace(data.id);
    }
  }

  return (
    <li
      className={cx(styles.placesListItem, { highlighted: isHighlighted })}
      onClick={handleClick}
    >
      <div className={styles.details}>
        <h1>CEP: {data.postalCode}</h1>
        <h2>{data.street}</h2>
        <h3>{data.neighborhood}</h3>
        <p>
          {data.city}, {data.state}
        </p>
      </div>
      <div className={styles.options}>
        <span id="btnFavorite" onClick={handleFavorite}>
          {data.favorite ? (
            <MdFavorite className={styles.favorite} />
          ) : (
            <MdFavoriteBorder />
          )}
        </span>
        <HiOutlineTrash id="btnDelete" onClick={handleDelete} />
      </div>
    </li>
  );
};

export default PlacesListItem;
