import { FormEvent, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import SearchResultModal from "../SearchResultModal";

import { searchByPostalCode } from "../../services/BrasilAPI";

import styles from "./styles.module.scss";

import searchImg from "../../assets/search.svg";

type Place = {
  postalCode: number;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
};

const SearchBar = () => {
  const [query, setQuery] = useState<string>("");
  const [result, setResult] = useState<Place>();
  const [showSearchResultModal, setShowSearchResultModal] = useState(false);

  async function handleSearch(event: FormEvent) {
    event.preventDefault();

    if (query === "") return;

    const toastId = toast.loading("Buscando dados...", {
      position: "top-right",
    });

    const place = await searchByPostalCode(+query.trim().replace("-", ""));

    toast.dismiss(toastId);

    if (place) {
      setResult(place);
      setShowSearchResultModal(true);
    } else {
      toast.error("CEP não encontrado.", {
        position: "top-right",
      });
    }
  }

  return (
    <div className={styles.searchBar}>
      <form>
        <input
          type="string"
          placeholder="Pesquise pelo CEP"
          value={query}
          onChange={({ target }) => setQuery(target.value)}
        />
        <button onClick={handleSearch}>
          <img src={searchImg} alt="Pesquisar" />
        </button>
        {result && (
          <SearchResultModal
            modalIsOpen={showSearchResultModal}
            closeModal={() => setShowSearchResultModal(false)}
            place={result}
          />
        )}
      </form>
      <Toaster />
    </div>
  );
};

export default SearchBar;
