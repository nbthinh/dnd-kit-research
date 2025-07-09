import {DndContext} from '@dnd-kit/core';
import {SortableContext} from '@dnd-kit/sortable';
import './App.css'
import { Droppable } from './components/Droppable';
import { Draggable } from './components/Draggable';
import React, {useState} from 'react';

function App() {
  const [items] = useState([1, 2, 3]);

  return (
    <>
      <DndContext>
        <SortableContext items={items}>
          {/* ... */}
        </SortableContext>
      </DndContext>
    </>
  )
}

export default App
