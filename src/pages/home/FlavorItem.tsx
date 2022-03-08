import { Divider, ListItem, ListItemText } from "@mui/material";
import { MoreMenu } from "core/components/MoreMenu";

import { FlavorItemMenu } from "./FlavorItemMenu";
import { FlavorItemData } from "./FlavorList";

interface FlavorItemProps extends FlavorItemData {
  lastItem: boolean;
}

export const FlavorItem: React.FC<FlavorItemProps> = ({
  ingredients,
  id,
  lastItem,
  name,
}): JSX.Element => {
  return (
    <>
      <ListItem>
        <ListItemText>
          <strong>{name}</strong>
          <br />
          {ingredients}
        </ListItemText>
        <MoreMenu>
          <FlavorItemMenu id={id} />
        </MoreMenu>
      </ListItem>
      {!lastItem && <Divider />}
    </>
  );
};
