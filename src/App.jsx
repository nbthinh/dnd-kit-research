import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';

import {
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';

import './App.css'
import { Droppable } from './components/Droppable';
import { Draggable } from './components/Draggable';
import React, {useState} from 'react';
import { SortableItem } from './components/SortableItem';
import { Box, ThemeProvider, createTheme } from '@mui/system';

// eslint-disable-next-line no-unused-vars
const theme = createTheme({
  palette: {
    background: {
      paper: '#fff',
    },
    text: {
      primary: '#173A5E',
      secondary: '#46505A',
    },
    action: {
      active: '#001E3C',
    },
    success: {
      dark: '#009688',
    },
  },
});

function App() {
  const [items, setItems] = useState([1, 2, 3]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event) {
    const {active, over} = event;
    
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  

  return (
    <>
      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext 
          items={items}
          strategy={verticalListSortingStrategy}
        >
          <Box sx={{display: 'flex', gap: 1}}>
            {items.map(id => <SortableItem key={id} id={id} />)}
          </Box>
        </SortableContext>
      </DndContext>
    </>
  )
}

export default App
