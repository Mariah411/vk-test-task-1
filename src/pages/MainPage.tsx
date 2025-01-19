import { LoadingOutlined } from "@ant-design/icons";
import { Modal, Spin } from "antd";
import { observer } from "mobx-react-lite";
import { useCallback, useEffect, useRef, useState } from "react";
import ListItem from "../components/ListItem";
import dataStore from "../store/dataStore";

const MainPage = observer(() => {
  // const { count, increment, decrement } = counterStore;
  // const [pageNumber, setPageNumber] = useState(1);

  const [currElement, setCurrElement] = useState<any>({} as any);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleClose = () => {
    setIsModalOpen(false);
  };

  const {
    results,
    isLoading,
    isError,
    error,
    hasNextPage,
    getPageAction,
    incrementPage,
    pageNumber,
    deleteElement,
  } = dataStore;

  // useEffect(() => {
  //   incrementPage();
  // }, []);
  // useEffect(() => incrementPage());

  useEffect(() => {
    getPageAction();
  }, [pageNumber]);

  const intObserver = useRef<any>();

  const lastItemRef = useCallback(
    (item) => {
      if (isLoading) return;

      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((items) => {
        if (items[0].isIntersecting && hasNextPage) {
          incrementPage();
          // setPageNumber((prev) => prev + 1);
        }
      });

      if (item) intObserver.current.observe(item);
    },
    [isLoading, hasNextPage]
  );

  if (isError) return <p>ОШИБКА: {error.message}</p>;

  const content = results.map((item, i) => {
    if (i + 1 === results.length) {
      return (
        <ListItem
          deleteElement={deleteElement}
          handleOpenModal={showModal}
          key={item.id}
          ref={lastItemRef}
          item={item}
        />
      );
    } else {
      return (
        <ListItem
          deleteElement={deleteElement}
          handleOpenModal={showModal}
          key={item.id}
          item={item}
        />
      );
    }
  });

  return (
    <div>
      <div style={{ position: "sticky", top: "0px", zIndex: 1000 }}>
        {pageNumber}
      </div>
      <button onClick={() => incrementPage()}>-</button>
      {/* <button onClick={() => decrement(1)}>-</button>
      <span>{count}</span>
      <button onClick={() => increment(1)}>+</button> */}
      Бесконечный скролл
      {content}
      {isLoading && <Spin indicator={<LoadingOutlined spin />} />}
      <Modal
        open={isModalOpen}
        onClose={handleClose}
        onCancel={handleCancel}
      ></Modal>
    </div>
  );
});

export default MainPage;
