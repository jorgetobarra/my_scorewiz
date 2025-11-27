/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/forbid-prop-types */
import * as React from 'react';
import {
  DragDropContext,
  Droppable,
  DropResult,
  DraggableLocation,
} from 'react-beautiful-dnd';
import DraggableListItem from './DraggableListItem';
import { reorder } from '../../services/helpers';

interface DraggableListProps {
  items: any[];
  setItems: (items: any[]) => void;
  onDragEnd?: (result: DropResult, items: any[], setItems: (items: any[]) => void) => void;
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

const DraggableList = React.memo(({ items, setItems, onDragEnd = onDragEndDefault }: DraggableListProps) => (
  // <DragDropContext>
  <DragDropContext onDragEnd={(result) => onDragEnd(result, items, setItems)}>
    <Droppable droppableId="droppable-list">
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {items.map((item, index) => (
            <DraggableListItem item={item} index={index} key={item.id} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </DragDropContext>
));

export default DraggableList;
