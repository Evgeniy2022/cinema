import { createContext, useContext, useEffect, useState } from "react";
import { getGenres } from "./api/api";

export const genreContext = createContext({});

export const GanreContextProvider = ({ children }) => {
  const [ganre, setGanre] = useState({});

  useEffect(() => {
    getGenres().then((data) => {
      const dictionary = {};

      for (const item of data) {
        dictionary[item.id] = item.name;
      }

      setGanre(dictionary);
    });
  }, []);
  return (
    <genreContext.Provider value={ganre}>{children}</genreContext.Provider>
  );
};

export const Ganres = ({ ids }) => {
  const genres = useContext(genreContext);
  return (
    <>
      {ids.map((id) => {
        return (
          <div key={id}>
            <div className="movie__genre-name">{genres[id]}</div>
          </div>
        );
      })}
    </>
  );
};
