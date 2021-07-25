import { MdFavoriteBorder } from "react-icons/md";
import { HiOutlineTrash } from "react-icons/hi";
import cx from "classnames";

import styles from "./styles.module.scss";
import { useState } from "react";

const PlacesListItem = () => {
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
        <h1>CEP: 05639100</h1>
        <h2>Rua Paulo Sérgio de Macedo</h2>
        <h3>Lar São Paulo</h3>
        <p>São Paulo, SP</p>
      </div>
      <div className={styles.options}>
        <MdFavoriteBorder />
        <HiOutlineTrash />
      </div>
    </ul>
  );
};

export default PlacesListItem;
