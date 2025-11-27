import * as React from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { reorder } from "../../services/helpers";
import DraggableListItem from "./DraggableListItem";

interface DraggableListProps {
  items: any[];
  setItems: (items: any[]) => void;
  onDragEnd?: (
    result: DropResult,
    items: any[],
    setItems: (items: any[]) => void
  ) => void;
}

const onDragEndDefault = (
  result: DropResult,
  items: any[],
  setItems: (items: any[]) => void
) => {
  const { destination, source } = result;
  // dropped outside the list
  if (!destination) return;

  const newItems = reorder(items, source.index, destination.index);

  setItems(newItems);
};

const DraggableList = React.memo(
  ({ items, setItems, onDragEnd = onDragEndDefault }: DraggableListProps) => (
    // <DragDropContext>
    <DragDropContext onDragEnd={(result) => onDragEnd(result, items, setItems)}>
      <Droppable droppableId="droppable-list">
        {(provided, snapshot) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {items.map((item, index) => (
              <DraggableListItem key={item.id} item={item} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
);

DraggableList.displayName = "DraggableList";

export default DraggableList;
