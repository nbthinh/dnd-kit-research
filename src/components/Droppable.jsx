import React from 'react';
import {useDroppable} from '@dnd-kit/core';

export const Droppable = (props) => {
  // Định nghĩa vùng không gian để drop
  // Xác định id của nó
  // isOver = true nếu hover vào vùng không gian drop
  // = false khi rê ngoài vùng không gian drop
  const {isOver, setNodeRef} = useDroppable({
    id: props.id,
  });
  const style = {
    color: isOver ? 'green' : undefined,
    border: '1px solid white',
    height: '50vh'
  };

  console.log('isOver = ', isOver)
  
  
  return (
    // Thêm thuộc tính ref={setNodeRef} để biến khung thẻ div này thành nơi để thả item
    // Việc định nghĩa biến isOver ở trên để cho biết nó sẽ là biến cờ để phát hiện có phần tử nào thả (hover) vào nó không
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}