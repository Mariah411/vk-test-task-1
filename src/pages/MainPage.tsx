import { useCallback, useRef, useState } from "react";
import ListItem from "../components/ListItem";
import useData from "../hooks/useData";

const MainPage = () => {
  const [pageNumber, setPageNumber] = useState(1);

  const { results, isLoading, isError, error, hasNextPage } =
    useData(pageNumber);

  const intObserver = useRef<any>();

  const lastItemRef = useCallback(
    (item) => {
      if (isLoading) return;

      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((items) => {
        if (items[0].isIntersecting && hasNextPage) {
          setPageNumber((prev) => prev + 1);
        }
      });

      if (item) intObserver.current.observe(item);
    },
    [isLoading, hasNextPage]
  );

  if (isError) return <p>ОШИБКА: {error.message}</p>;

  const content = results.map((item, i) => {
    if (i + 1 === results.length) {
      return <ListItem key={item.id} ref={lastItemRef} item={item} />;
    } else {
      return <ListItem key={item.id} item={item} />;
    }
  });

  return (
    <div>
      Бесконечный скролл
      {content}
      {isLoading && <p>Загрузка...</p>}
    </div>
  );
};

export default MainPage;
