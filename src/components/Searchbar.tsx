import { merriweather } from "@/fonts/fonts";
import { FormEvent, useState } from "react";

interface SearchbarProps {
  setSearch: (value: string | null) => void;
  setPage: (value: number) => void;
}

export default function Searchbar({ setSearch, setPage }: SearchbarProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch(input);
    setPage(1);
  };
  return (
    <div className="max-w-screen-md md:mx-auto">
      <form
        className="flex w-full md:w-96 pb-2 border-b-2"
        onSubmit={(e) => handleSubmit(e)}
      >
        <input
          type="text"
          placeholder="Search item here"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          className={`${merriweather.className} flex-grow text-sm border-none pl-0 transform -skew-x-12 tracking-widest focus:ring-0 focus:ring-offset-0`}
        />
        <input
          type="submit"
          value="SEARCH"
          className="font-bold text-sm tracking-widest cursor-pointer hover:tracking-[1.8px] transition-all duration-200 ease-linear"
        />
      </form>
    </div>
  );
}
