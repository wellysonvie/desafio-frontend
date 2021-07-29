import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import cx from "classnames";
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
  latitude: number;
  longitude: number;
};

const PlaceForm = ({ closeModal, data }: PlaceFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { addSavedPlace, getSavedPlaceByPostalCode } = useMapContext();

  useEffect(() => {
    if (!(data.latitude || data.longitude)) {
      toast.error("Coordenadas não encontradas.", {
        position: "top-right",
      });
    }
  }, [data]);

  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    if (getSavedPlaceByPostalCode(formData.postalCode)) {
      toast.error("Este CEP já existe na sua lista.", {
        position: "top-right",
      });
      return;
    }

    addSavedPlace(
      formData.postalCode,
      formData.street,
      formData.neighborhood,
      formData.city,
      formData.state,
      formData.latitude,
      formData.longitude
    );

    toast.success("Local salvo com sucesso.", {
      position: "top-right",
    });

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

        <div
          id="coordinates"
          className={cx(styles.formGroup, {
            hidden: data.latitude && data.longitude,
          })}
        >
          <label htmlFor="coordinates">Coordenadas:</label>
          <div>
            <input
              id="latitude"
              type="number"
              placeholder="Latitude"
              {...register("latitude", { required: true })}
              defaultValue={data?.latitude}
              className={errors.latitude && styles.inputError}
            />
            <input
              id="longitude"
              type="number"
              placeholder="Longitude"
              {...register("longitude", { required: true })}
              defaultValue={data?.longitude}
              className={errors.longitude && styles.inputError}
            />
          </div>
          {(errors.latitude || errors.longitude) && (
            <span>Preencha estes campos</span>
          )}
        </div>
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
