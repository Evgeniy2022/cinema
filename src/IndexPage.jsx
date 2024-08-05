import { useEffect, useState, useRef } from "react";
import debounce from "lodash.debounce";

import { List, Pagination, Flex, Spin } from "antd";

import { Movie } from "./componenets/Movie/Movie";
import { getMovie } from "./api/api";

import "./App.css";
import { SearchInput } from "./componenets/SearchInput/SearchInput";


export function IndexPage() {
  const [movieList, setMovieList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [inputValue, setInputValue] = useState("return");
  const [loading, setLoading] = useState(false);

  const fetchCounterRef = useRef(0);

  const getMouvieRef = useRef(null);

  if (!getMouvieRef.current) {
    const fetchDebounced = debounce(
      (page, inputValue) => {
        let fetchCounter = ++fetchCounterRef.current;

        getMovie(page, inputValue).then((result) => {
          if (fetchCounter === fetchCounterRef.current) {
            setTotalPages(result.total_pages);
            setMovieList(result.results);
            setLoading(false);
          }
        });
      },
      1000,
      { leading: true }
    );
    getMouvieRef.current = (page, inputValue) => {
      setLoading(true);
      fetchDebounced(page, inputValue);
    };
  }

  useEffect(() => {
    getMouvieRef.current(currentPage, inputValue);
  }, [currentPage, inputValue]);

  return (
    <>
      <SearchInput
        inputValue={inputValue}
        setInputValue={setInputValue}
        setCurrentPage={setCurrentPage}
      />
      {loading ? (
        <Flex gap="middle" vertical>
          <Spin tip="Loading..." size="large"></Spin>
        </Flex>
      ) : (
        <>
          <List
            dataSource={movieList}
            renderItem={(movie) => <Movie key={movie.id} movie={movie} />}
          />
          <Pagination
			 style={{padding: '20px'}}
            current={currentPage}
            total={totalPages}
            pageSize={20}
            onChange={(currentPage) => {
              console.log("pagination", currentPage);
              setCurrentPage(currentPage);
            }}
            align={"center"}
          />
        </>
      )}
    </>
  );
}
