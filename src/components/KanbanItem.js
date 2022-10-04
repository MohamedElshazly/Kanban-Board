import React from 'react';
import { useDrag } from "react-dnd";
import CardDetails from './CardDetails';

import '../styles/card.css'

export default function KanbanItem({ item }) {
  const id = item.id;
  const [{ isDragging }, drag] = useDrag({
    type: `${item.status}`,
    item: { id },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });
  const opacity = isDragging ? 0 : 1;

  const viewDetails = () => {
    document.getElementById(`card-details-${id}`).style.display = 'block';
    document.getElementById(`card-details-${id}`).classList.add('dim');
  }

  return (
    <div>
      <div ref={drag} className='card' style={{ opacity }} onClick={viewDetails}>
        {item.name}
      </div>
      <CardDetails item={item} id={id} />
    </div>

  )
}
