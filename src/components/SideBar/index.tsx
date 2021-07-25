import { useState } from "react";
import { MdBookmarkBorder, MdFavoriteBorder } from "react-icons/md";
import cx from "classnames";

import PlacesList from "../PlacesList";

import styles from "./styles.module.scss";
import destinationsImg from "../../assets/destinations.svg";

const SideBar = () => {
  const [showVisitedPlacesList, setShowVisitedPlacesList] =
    useState<boolean>(true);
  const [showFavoritePlacesList, setShowFavoritePlacesList] =
    useState<boolean>(false);

  function handleShowVisitedPlacesList() {
    setShowVisitedPlacesList(true);
    setShowFavoritePlacesList(false);
  }

  function handleShowFavoritePlacesList() {
    setShowFavoritePlacesList(true);
    setShowVisitedPlacesList(false);
  }

  return (
    <aside className={styles.sidebar}>
      <div className={cx(styles.listSelector, { disabled: true })}>
        <div
          className={cx(styles.listSelectorItem, {
            active: showVisitedPlacesList,
          })}
          onClick={handleShowVisitedPlacesList}
        >
          <MdBookmarkBorder />
          <span>Locais visitados</span>
        </div>
        <div
          className={cx(styles.listSelectorItem, {
            active: showFavoritePlacesList,
          })}
          onClick={handleShowFavoritePlacesList}
        >
          <MdFavoriteBorder />
          <span>Favoritos</span>
        </div>
      </div>

      {false ? (
        <PlacesList />
      ) : (
        <div className={styles.emptyList}>
          <img src={destinationsImg} alt="Destinos" />
          <p>Gerencie os locais que você visitou na cidade.</p>
          <ul>
            <li>Pesquise os locais pelo CEP.</li>
            <li>Adicione-os à sua lista.</li>
            <li>Você também pode favoritá-los, em seguida.</li>
          </ul>
        </div>
      )}
    </aside>
  );
};

export default SideBar;
