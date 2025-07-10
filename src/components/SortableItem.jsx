import React from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

export function SortableItem(props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id: props.id});
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    border: `1px solid green`,
    padding: '5px 15px',
    borderRadius: '25px',
    cursor: 'pointer'
  };
  
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      Hello world {props.id}
    </div>
  );
}