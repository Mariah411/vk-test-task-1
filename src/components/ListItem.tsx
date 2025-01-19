import { Button, Card } from "antd";
import { forwardRef } from "react";
import { IItem } from "../types";

type Props = {
  item: IItem;
  deleteElement: any;
  handleEdit: any;
};

const ListItem = forwardRef((props: Props, ref: React.ForwardedRef<any>) => {
  const { item, deleteElement, handleEdit } = props;

  const itemBody = (
    <Card
      title={item.title}
      bordered={true}
      style={{ maxWidth: 900, margin: 10 }}
    >
      <p>{item.body}</p>
      <p>item id: {item.id}</p>

      <Button
        onClick={() => handleEdit({ ...item })}
        color="primary"
        variant="outlined"
        style={{ marginRight: 10 }}
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
    </Card>
    // <>
    //   <h2>{item.title}</h2>
    //   <p>{item.body}</p>
    //   <p>item id: {item.id}</p>
    // </>
  );

  return ref ? <div ref={ref}>{itemBody}</div> : <div>{itemBody}</div>;
});

export default ListItem;
