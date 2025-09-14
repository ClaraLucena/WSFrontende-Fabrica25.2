"use client"; // Importante no Next.js 13+ para habilitar estado e eventos no client
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

type Pokemon = {
  id: string;
  name: string;
  image: string;
};

export default function Component() {
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState("");
  const [appliedSearch, setAppliedSearch] = useState(""); // Novo estado para o termo de busca aplicado

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=20");
      const pokemons = response.data.results;

      const data: Pokemon[] = pokemons.map((pokemon: { name: string; url: string }) => {
        const id = pokemon.url.split("/").filter(Boolean).pop() || "0";
        const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
        return { id, name: pokemon.name, image };
      });

      setPokemonData(data);
    }

    fetchData();
  }, []);

  // Função para lidar com o clique no botão
  const handleSearchClick = () => {
    setAppliedSearch(search);
  };

  // Filtra os pokemons usando `appliedSearch`
  const filteredPokemon = pokemonData.filter((poke) =>
    poke.name.toLowerCase().includes(appliedSearch.toLowerCase())
  );

  return (
    <main className="p-4 pb-20">
      <section>
        <label>Busque aqui o seu POKEMON:</label>
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-amber-300 rounded p-1 ml-2"
        />
        {/* Adiciona o onClick no botão para função de busca */}
        <button onClick={handleSearchClick} className="rounded p-1 bg-amber-300">Buscar</button>
      </section>

      <section>
        <table className="text-center text-xs md:text-base border border-amber-400 mx-auto mt-6 w-[90%]">
          <tbody>
            <tr className="font-bold border-b border-amber-300">
              <td className="p-2">Pokemon</td>
              <td className="p-2">Nome</td>
              <td className="p-2">ID</td>
            </tr>

            {filteredPokemon.map((poke) => (
              <tr key={poke.id} className="border-b border-amber-200">
                <td className="p-2">
                  <Image src={poke.image} alt={poke.name} width={48} height={48} className="mx-auto" />
                </td>
                <td className="capitalize p-2">{poke.name}</td>
                <td className="p-2">{poke.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}