/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/forbid-prop-types */
import * as React from 'react';
import {
  DragDropContext,
  Droppable,
} from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import DraggableListItem from './DraggableListItem';
import { reorder } from '../../services/helpers';

const onDragEndDefault = ({
  destination, source, items, setItems,
}) => {
  // dropped outside the list
  if (!destination) return;

  const newItems = reorder(items, source.index, destination.index);

  setItems(newItems);
};

const DraggableList = React.memo(({ items, setItems, onDragEnd }) => (
  // <DragDropContext>
  <DragDropContext onDragEnd={(props) => onDragEnd({ ...props, items, setItems })}>
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
DraggableList.propTypes = {
  items: PropTypes.array.isRequired,
  setItems: PropTypes.func.isRequired,
  onDragEnd: PropTypes.func,
};
DraggableList.defaultProps = {
  onDragEnd: onDragEndDefault,
};

export default DraggableList;
