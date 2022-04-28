import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import { Divider, ListItem, ListItemText } from "@mui/material";
import { MoreMenu } from "core/components/MoreMenu";
import { FlavorItemData } from "types/app";

import { FlavorItemMenu } from "./FlavorItemMenu";

interface FlavorItemProps extends FlavorItemData {
  lastItem: boolean;
}

export const FlavorItem: React.FC<FlavorItemProps> = ({
  ingredients,
  id,
  lastItem,
  name,
}): JSX.Element => (
  <>
    <ListItem>
      <ListItemText>
        <strong>{name}</strong>
        <br />
        {ingredients}
      </ListItemText>
      <MoreMenu icon={<MoreVertIcon />}>
        <FlavorItemMenu id={id} />
      </MoreMenu>
    </ListItem>
    {!lastItem && <Divider />}
  </>
);
