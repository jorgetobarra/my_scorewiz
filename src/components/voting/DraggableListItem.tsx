import DragHandleIcon from "@mui/icons-material/DragHandle";
import { ListItemIcon } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { amber } from "@mui/material/colors";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import makeStyles from "@mui/styles/makeStyles";
import * as React from "react";
import { Draggable } from "react-beautiful-dnd";
import { POINTS } from "../../utils/constants";

interface DraggableListItemProps {
  item: {
    id: string;
    name: string;
  };
  index: number;
}

const useStyles = makeStyles({
  draggingListItem: {
    background: "rgb(235,235,235)",
  },
});

function DraggableListItem({ item, index }: DraggableListItemProps) {
  const classes = useStyles();
  const points = POINTS; // TODO: adapt to contests' point system
  // TODO: the todo before will need adding in the new contest screen
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <ListItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={snapshot.isDragging ? classes.draggingListItem : ""}
        >
          <ListItemAvatar>
            {index === 0 ? (
              <Avatar sx={{ bgcolor: amber[600] }}>
                {points.length >= index ? points[index] : 0}
              </Avatar>
            ) : (
              <Avatar>{points.length >= index ? points[index] : 0}</Avatar>
            )}
          </ListItemAvatar>
          {/* TODO: don't repeat the name, maybe add second name as participant - song */}
          <ListItemText primary={item.name} secondary={item.id} />
          <ListItemIcon>
            <DragHandleIcon />
          </ListItemIcon>
        </ListItem>
      )}
    </Draggable>
  );
}

export default DraggableListItem;
