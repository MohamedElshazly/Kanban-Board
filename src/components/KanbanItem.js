import React from 'react'; 
import { useDrag } from "react-dnd";

import '../styles/card.css'

export default function KanbanItem({ item }) {
    const id = item.id;
    const [{ isDragging }, drag] = useDrag({
        type: `${item.status}`,
        item: {id},
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    });
    const opacity = isDragging ? 0 : 1; 

  return (
    <div ref={drag} className='card' style={{opacity}}>{item.name}--{item.priority}</div>
  )
}
