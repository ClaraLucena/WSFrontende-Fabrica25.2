import Image from "next/image";

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between w-full bg-amber-500 p-4">
            <Image
                src="/pokemon-logo.png"
                alt="Logo Pokémon"
                width={150}
                height={150}
                priority
            />
            <header className="text-xl font-bold text-black text-center ">
                Seja bem-vindo(a), aqui você pode ver a lista de POKEMON!
            </header>
            <Image
                src="/pokemon.png"
                alt="Pokémon"
                width={100}
                height={100}
                className="h-12 w-auto"
            />
        </nav>
    );
}