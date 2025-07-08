import React from 'react';
import {useDraggable} from '@dnd-kit/core';
import {CSS} from '@dnd-kit/utilities';

export const Draggable = (props) => {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: 'draggable',
  });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    // transform: CSS.Translate.toString(transform),
    // transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`
  } : undefined;

  
  return (
    <>
      <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
        {props.children}
      </button>
    </>
  );
}

/**
 * Tiếp đến, thực hiện Draggable component. Để làm nó, chúng ta sẽ sử dụng useDraggable hook
 * Hook useDraggable không nói lên được cấu trúc ứng dụng bạn như nào. Tuy nhiên nó sẽ yêu cầu bạn cho phép các listener và 1 ref tới phần tử DOM mà bạn muốn nó trở thành phần tử có thể kéo được. Bạn cũng sẽ cần cung cấp 1 thuộc tính id duy nhất tới tất cả các component draggble.
 * Sau khi item draggable được cầm lên (pick up), thuộc tính transform sẽ xác định các toạ độ thay đổi mà bạn sẽ cần để di chuyển item trên màn hình
 * Thuộc tính transfor có cấu trúc như sau: {x: number, y: number, scaleX: number, scaleY: number}
*/
