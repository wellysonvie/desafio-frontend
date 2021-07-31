import { useState } from "react";
import { MdBookmarkBorder, MdFavoriteBorder } from "react-icons/md";
import cx from "classnames";

import { useMapContext } from "../../contexts/MapContext";
import PlacesList from "../PlacesList";

import styles from "./styles.module.scss";
import destinationsImg from "../../assets/destinations.svg";

const SideBar = () => {
  const { savedPlaces, getFavoritePlaces } = useMapContext();

  const [showFavoritePlacesList, setShowFavoritePlacesList] =
    useState<boolean>(false);

  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <aside className={cx(styles.sidebar, { expand: expanded })}>
      <button
        className={styles.btnExpand}
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "Fechar" : "Expandir"}
      </button>
      <div
        id="listSelector"
        className={cx(styles.listSelector, {
          disabled: savedPlaces.length === 0,
        })}
      >
        <div
          className={cx(styles.listSelectorItem, {
            active: !showFavoritePlacesList,
          })}
          onClick={() => setShowFavoritePlacesList(!showFavoritePlacesList)}
        >
          <MdBookmarkBorder />
          <span>Locais visitados</span>
        </div>
        <div
          className={cx(styles.listSelectorItem, {
            active: showFavoritePlacesList,
          })}
          onClick={() => setShowFavoritePlacesList(!showFavoritePlacesList)}
        >
          <MdFavoriteBorder />
          <span>Favoritos</span>
        </div>
      </div>

      {savedPlaces.length > 0 ? (
        <PlacesList
          data={showFavoritePlacesList ? getFavoritePlaces() : savedPlaces}
        />
      ) : (
        <div id="initialEmptyList" className={styles.emptyList}>
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
