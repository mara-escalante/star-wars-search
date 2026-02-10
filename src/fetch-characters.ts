const URL = "https://swapi.dev/api/people";

export const fetchCharacters = async (query: string) => {
  const res = await fetch(`${URL}?search=${query}`);
  if (!res.ok) {
    throw new Error(`Error ${res.status}`);
  }
  return await res.json();
};
