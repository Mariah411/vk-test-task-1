import { Button, Card, Divider, Space } from "antd";
import { forwardRef } from "react";
import { IItem } from "../../types";

import styles from "./ListItem.module.css";

type Props = {
  item: IItem;
  deleteElement: any;
  handleEdit: any;
};

const ListItem = forwardRef((props: Props, ref: React.ForwardedRef<any>) => {
  const { item, deleteElement, handleEdit } = props;

  const itemBody = (
    <Card title={item.title} bordered={true} className={styles.card}>
      <p>{item.body}</p>
      <Space split={<Divider type="vertical" />}>
        <p>id поста: {item.id}</p>
        <p>id пользователя: {item.userId}</p>
      </Space>

      <Space.Compact block>
        <Button
          onClick={() => handleEdit({ ...item })}
          color="primary"
          variant="outlined"
          style={{ marginRight: 2 }}
        >
          Редактировать
        </Button>
        <Button
          onClick={() => deleteElement(item.id)}
          color="danger"
          variant="outlined"
        >
          Удалить
        </Button>
      </Space.Compact>
    </Card>
  );

  return ref ? <div ref={ref}>{itemBody}</div> : <div>{itemBody}</div>;
});

export default ListItem;
