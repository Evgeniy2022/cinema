import { useEffect, useState, useRef } from "react";
import debounce from "lodash.debounce";

import { List, Pagination, Flex, Spin } from "antd";

import { Movie } from "./componenets/Movie/Movie";
import { guestSessionGetRate } from "./api/api";

import "./App.css";


export function RatePage() {
  const [movieList, setMovieList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchCounterRef = useRef(0);

  const getMouvieRef = useRef(null);

  if (!getMouvieRef.current) {
    const fetchDebounced = debounce(
      (page) => {
        let fetchCounter = ++fetchCounterRef.current;

        guestSessionGetRate(page).then((result) => {
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
    getMouvieRef.current = (page) => {
      setLoading(true);
      fetchDebounced(page);
    };
  }

  useEffect(() => {
    getMouvieRef.current(currentPage);
  }, [currentPage]);



  return (
    <>
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
            current={currentPage}
            total={totalPages}
            pageSize={20}
            onChange={(currentPage) => {
              setCurrentPage(currentPage);
            }}
            align={"center"}
          />
        </>
      )}
    </>
  );
}
