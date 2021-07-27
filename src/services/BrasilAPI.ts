type Place = {
  postalCode: number;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
};

export async function searchByPostalCode(postalCode: number) {
  try {
    const response = await fetch(
      `https://brasilapi.com.br/api/cep/v2/${postalCode}`
    );
    const data = await response.json();

    if (response.status === 200) {
      return {
        postalCode: data.cep,
        street: data.street,
        neighborhood: data.neighborhood,
        city: data.city,
        state: data.state,
        latitude: data.location.coordinates.latitude,
        longitude: data.location.coordinates.longitude,
      } as Place;
    }
  } catch (error) {
    console.error(error);
  }

  return null;
}
