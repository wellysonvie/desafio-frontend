import { MdFavoriteBorder } from "react-icons/md";
import { HiOutlineTrash } from "react-icons/hi";
import cx from "classnames";

import { PlaceType } from "../../contexts/MapContext";

import styles from "./styles.module.scss";
import { useState } from "react";

type PlacesListItemProps = {
  data: PlaceType;
};

const PlacesListItem = ({ data }: PlacesListItemProps) => {
  const [isHighlighted, setIsHighlighted] = useState<boolean>(false);

  function handleClick() {
    setIsHighlighted(!isHighlighted);
  }

  return (
    <ul
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
        <MdFavoriteBorder />
        <HiOutlineTrash />
      </div>
    </ul>
  );
};

export default PlacesListItem;
