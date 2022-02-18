import React, { useState, useEffect } from "react";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import Axios from "axios";
import FeaturedItem from "./FeaturedItem";

const InfiniteFeaturedItems = () => {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [isFetching, setIsFetching, hasMore, sethasMore] = useInfiniteScroll(
    fetchMore
  );

  useEffect(() => {
    fetchMore();
  }, []);

  function fetchMore() {
    setPage(page + 1);
    Axios.get('/api/practices/', {
      params: { page_size: 2, page },
    })
      .then((res) => {
        setItems((prevState) => [...prevState, ...res.data.results]);
        setIsFetching(false);
        sethasMore(res.next !== null);
      })
      .catch((res) => {
        setIsFetching(false);
        sethasMore(false);
      });
  }

  return (
    <>
      <div className="card-deck">
        {items.map(listItem => (
          <FeaturedItem data={listItem} />
        ))}
      </div>
      {isFetching && ""}
    </>
  );
};

export default InfiniteFeaturedItems;
