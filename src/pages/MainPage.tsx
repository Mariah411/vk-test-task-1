import { LoadingOutlined } from "@ant-design/icons";
import { Modal, Spin } from "antd";
import { observer } from "mobx-react-lite";
import { useCallback, useEffect, useRef } from "react";
import ListItem from "../components/ListItem";
import EditForm from "../components/editForm";
import useModal from "../hooks/useModal";
import dataStore from "../store/dataStore";
import { IItem } from "../types";

const MainPage = observer(() => {
  const {
    currElement,
    isModalOpen,
    handleEdit,
    handleOk,
    handleClose,
    handleCancel,
  } = useModal();

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
    editElement,
    isEditingError,
  } = dataStore;

  const onSubmit = (data: IItem) => {
    editElement(data);
    handleOk();
  };

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
          handleEdit={handleEdit}
          key={item.id}
          ref={lastItemRef}
          item={item}
        />
      );
    } else {
      return (
        <ListItem
          deleteElement={deleteElement}
          handleEdit={handleEdit}
          key={item.id}
          item={item}
        />
      );
    }
  });

  return (
    <div>
      {/* <div style={{ position: "sticky", top: "0px", zIndex: 1000 }}>
        {pageNumber}
      </div>
      Бесконечный скролл */}
      {content}
      {isLoading && <Spin indicator={<LoadingOutlined spin />} />}
      <Modal
        open={isModalOpen}
        onClose={handleClose}
        onCancel={handleCancel}
        onOk={handleOk}
      >
        {/* {JSON.stringify(currElement)} */}
        <EditForm currElement={currElement} submit={onSubmit} />
      </Modal>
    </div>
  );
});

export default MainPage;
