import { useState, useEffect } from "react";

const useInfiniteScroll = callback => {
  const [hasMore, sethasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching || !hasMore) return;
    callback();
  }, [isFetching, hasMore]);

  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isFetching
    )
      return;
    setIsFetching(true);
  }

  return [isFetching, setIsFetching, hasMore, sethasMore];
};

export default useInfiniteScroll;
