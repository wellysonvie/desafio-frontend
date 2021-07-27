import Modal from "react-modal";
import PlaceForm from "../PlaceForm";

import styles from "./styles.module.scss";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

type Place = {
  postalCode: number;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
};

type SearchResultModalProps = {
  modalIsOpen: boolean;
  closeModal: () => void;
  place: Place;
};

const SearchResultModal = ({
  modalIsOpen,
  closeModal,
  place,
}: SearchResultModalProps) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Resultado encontrado"
      className={styles.searchResultModal}
      overlayClassName={styles.modalOverlay}
    >
      <div className={styles.searchResultModalContent}>
        <h2>Resultado encontrado</h2>
        <PlaceForm closeModal={closeModal} data={place} />
      </div>
    </Modal>
  );
};

export default SearchResultModal;
