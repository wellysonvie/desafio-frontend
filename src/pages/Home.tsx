import MapArea from "../components/MapArea";
import SideBar from "../components/SideBar";
import { MapContextProvider } from "../contexts/MapContext";

import styles from "../styles/Home.module.scss";

const Home = () => {
  return (
    <main className={styles.home}>
      <MapContextProvider>
        <SideBar />
        <MapArea />
      </MapContextProvider>
    </main>
  );
};

export default Home;
