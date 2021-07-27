import { useForm, SubmitHandler } from "react-hook-form";
import { useMapContext } from "../../contexts/MapContext";

import styles from "./styles.module.scss";

type Place = {
  postalCode: number;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
};

type PlaceFormProps = {
  closeModal: () => void;
  data: Place;
};

type Inputs = {
  postalCode: number;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
};

const PlaceForm = ({ closeModal, data }: PlaceFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { addSavedPlace } = useMapContext();

  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    addSavedPlace(
      formData.postalCode,
      formData.street,
      formData.neighborhood,
      formData.city,
      formData.state,
      data.latitude,
      data.longitude
    );

    closeModal();
  };

  return (
    <form className={styles.placeForm} onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <label htmlFor="postalCode">CEP:</label>
        <input
          id="postalCode"
          type="number"
          {...register("postalCode", { required: true })}
          defaultValue={data?.postalCode}
          className={errors.postalCode && styles.inputError}
        />
        {errors.postalCode && <span>Preencha este campo</span>}

        <label htmlFor="street">Logradouro:</label>
        <input
          id="street"
          type="text"
          {...register("street", { required: true })}
          defaultValue={data?.street}
          className={errors.street && styles.inputError}
        />
        {errors.street && <span>Preencha este campo</span>}

        <label htmlFor="neighborhood">Bairro:</label>
        <input
          id="neighborhood"
          type="text"
          {...register("neighborhood", { required: true })}
          defaultValue={data?.neighborhood}
          className={errors.neighborhood && styles.inputError}
        />
        {errors.neighborhood && <span>Preencha este campo</span>}

        <label htmlFor="city">Cidade:</label>
        <input
          id="city"
          type="text"
          {...register("city", { required: true })}
          defaultValue={data?.city}
          className={errors.city && styles.inputError}
        />
        {errors.city && <span>Preencha este campo</span>}

        <label htmlFor="state">Estado:</label>
        <input
          id="state"
          type="text"
          {...register("state", { required: true })}
          defaultValue={data?.state}
          className={errors.state && styles.inputError}
        />
        {errors.state && <span>Preencha este campo</span>}
      </fieldset>
      <div className={styles.formOptions}>
        <button className={styles.btnCancel} onClick={closeModal}>
          Cancelar
        </button>
        <button
          className={styles.btnSave}
          disabled={Object.entries(errors).length > 0}
        >
          Salvar
        </button>
      </div>
    </form>
  );
};

export default PlaceForm;
