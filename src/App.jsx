import {DndContext} from '@dnd-kit/core';
import './App.css'
import { Droppable } from './components/Droppable';
import { Draggable } from './components/Draggable';
import React, {useState} from 'react';
function App() {
  const [isDropped, setIsDropped] = useState(false);
  const draggableMarkup = (
    <Draggable>Drag me</Draggable>
  );

  // Fire khi thả card
  function handleDragEnd(event) {
    console.log('Căm thù thằng Nguyễn Thắng 89 = ', event)
    // Nếu thả phần tử dragable vào vùng over thì sẽ có thông tin của event.over
    // Không thì event.over == null
    if (event.over && event.over.id === 'droppable') {
      setIsDropped(true);
    }
  }

  return (
    <>
      <DndContext onDragEnd={handleDragEnd}>
        {!isDropped ? draggableMarkup : null}
        <Droppable>
          {isDropped ? draggableMarkup : 'Drop here'}
        </Droppable>
      </DndContext>
    </>
  )
}

export default App
