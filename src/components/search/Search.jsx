import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { url, option } from "../../api";

const Search = ({ setSearchData }) => {
  const [search, setSearch] = useState(null);
  const loadOptions = (input) => {
    return fetch(
      `${url}/cities?minPopulation=10000&namePrefix=${input}&limit=10&sort=name`,
      option
    )
      .then((response) => response.json())
      .then((response) => {
        const cities = response.data ? response.data : [];
        return {
          options: cities.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
          hasMore: false,
        };
      })
      .catch((err) => {
        console.error(err);
        return { options: [] };
      });
  };
  const handleOnChange = (e) => {
    setSearch(e);
    setSearchData(e);
  };
  return (
    <AsyncPaginate
      debounceTimeout={600}
      placeholder="Buscar por ciudad"
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};

export default Search;
