import MapArea from "../components/MapArea";
import SideBar from "../components/SideBar";

import styles from "../styles/Home.module.scss";

const Home = () => {
  return (
    <main className={styles.home}>
      <SideBar />
      <MapArea />
    </main>
  );
};

export default Home;
