import { Divider, ListItem, ListItemText } from "@mui/material";
import { MoreMenu } from "components/MoreMenu";

import { BookItemMenu } from "./BookItemMenu";
import { BookItemData } from "./BookList";

interface BookItemProps extends BookItemData {
  lastItem: boolean;
}

export const BookItem: React.FC<BookItemProps> = ({
  author,
  id,
  lastItem,
  title,
}): JSX.Element => {
  return (
    <>
      <ListItem>
        <ListItemText>
          <strong>{title}</strong>
          <br />
          {author}
        </ListItemText>
        <MoreMenu>
          <BookItemMenu id={id} />
        </MoreMenu>
      </ListItem>
      {!lastItem && <Divider />}
    </>
  );
};
