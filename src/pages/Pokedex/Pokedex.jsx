import React, { useCallback, useEffect, useState } from "react";
import Search from "../../Components/Search";
import PokemonList from "../../Components/PokemonList";
import axios from "axios";
import usePagination from "../../Hooks/usePagination";
import useDebounce from "../../Hooks/useDebounce";

const Pokedex = () => {
  const totalItems = 898;
  const initialOffset = 0;
  const visiblePages = 5;
  const pagesSize = 32;
  const {
    currentPage,
    pageSize,
    totalPages,
    currentOffset,
    handleNextPage,
    handlePrevPage,
    goToPage,
    getPaginationArray,
    lastPage,
    firstPage,
  } = usePagination(initialOffset, totalItems, pagesSize, visiblePages);
  const [pokemonArr, setPokemonArr] = useState([]);
  const [filteredArr, setFilteredArr] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const debounceDelay = 500;
  const debouncedSearchTerm = useDebounce(search, debounceDelay);

  useEffect(() => {
    const fetchPokemon = async () => {
      const promises = [];
      for (let i = currentOffset + 1; i <= currentOffset + pageSize; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(axios.get(url));
      }
      try {
        const responses = await Promise.all(promises);
        const updatedPokemonArr = responses.map((resp) => {
          const allTypes = resp.data.types.map((type) => type.type.name);
          const newPokemon = {
            name: resp.data.name,
            img: resp.data.sprites["front_default"],
            types: allTypes.join(", "),
          };
          return newPokemon;
        });
        setPokemonArr(updatedPokemonArr);
        setFilteredArr(updatedPokemonArr);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchPokemon();
  }, [currentOffset, pageSize]);

  const handleSearch = useCallback(
    async (searchValue) => {
      setIsLoading(true);
      const filterPokemons = pokemonArr.filter(({ name }) => {
        return name.toLowerCase().includes(searchValue.toLowerCase());
      });
      setSearch(searchValue);
      setFilteredArr(filterPokemons);

      if (!filterPokemons.length) {
        try {
          const resp = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${searchValue.toLowerCase()}`
          );
          const allTypes = resp.data.types.map((type) => type.type.name);
          const newPokemon = {
            name: resp.data.name,
            img: resp.data.sprites["front_default"],
            types: allTypes.join(", "),
          };
          setFilteredArr([newPokemon]);
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    },
    [pokemonArr]
  );

  const handleSearchInputChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    handleSearch(debouncedSearchTerm);
  }, [handleSearch, debouncedSearchTerm]);

  return (
    <>
      <h1 className='fw-medium text-center py-3 shadow text-light bg-primary'>
        Pokedex
      </h1>
      <Search
        handleSearchInputChange={handleSearchInputChange}
        search={search}
      />
      <PokemonList
        pokemonArr={filteredArr}
        currentPage={currentPage}
        totalPages={totalPages}
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
        goToPage={goToPage}
        getPaginationArray={getPaginationArray}
        lastPage={lastPage}
        firstPage={firstPage}
        isLoading={isLoading}
      />
    </>
  );
};

export default Pokedex;
