import { LoadingOutlined } from "@ant-design/icons";
import { Modal, Spin, Typography } from "antd";
import Alert from "antd/es/alert/Alert";
import { observer } from "mobx-react-lite";
import { useCallback, useEffect, useRef } from "react";
import ListItem from "../components/ListItem/ListItem";
import EditForm from "../components/editForm";
import useMessage from "../hooks/useMesage";
import useModal from "../hooks/useModal";
import dataStore from "../store/dataStore";
import { IItem } from "../types";

const MainPage = observer(() => {
  const { currElement, isModalOpen, handleEdit, handleOk, handleCancel } =
    useModal();

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

  const { contextHolder, errorMessage, successMessage } = useMessage();

  const submit = (data: IItem) => {
    editElement(data);
    handleOk();
    if (isEditingError) {
      errorMessage();
    } else {
      successMessage();
    }
  };

  const cancel = () => {
    handleCancel();
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
        }
      });

      if (item) intObserver.current.observe(item);
    },
    [isLoading, hasNextPage]
  );

  if (isError)
    return <Alert type="error" message={`ОШИБКА: ${error.message}`}></Alert>;

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
    <div style={{ margin: "0 auto", maxWidth: "900px", padding: 10 }}>
      {contextHolder}
      <Typography.Title level={1}>Список постов</Typography.Title>
      {content}
      {isLoading && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Spin indicator={<LoadingOutlined spin />} size="large" />{" "}
        </div>
      )}
      <Modal
        title="Редактирование поста"
        footer={null}
        open={isModalOpen}
        closable={false}
      >
        <EditForm currElement={currElement} submit={submit} cancel={cancel} />
      </Modal>
    </div>
  );
});

export default MainPage;
