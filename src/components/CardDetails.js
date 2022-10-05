import React from 'react'

export default function CardDetails({item, id}) {

    const closeCardDetails = () => {
        document.getElementById(`card-details-${id}`).style.display = 'none';
        document.getElementById(`card-details-${id}`).classList.remove('dim');
    }
    
  return (
    <div className='card-details' id={`card-details-${id}`}>
        <div className="card-details-content">
          <div className="card-header">
            <h1>{item.name}</h1>
            <h3>{item.priority} Priority</h3>
            <h4>belongs to the <strong>'{item.status}'</strong> status</h4>
          </div>
          <div className="description">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias aperiam aliquam error in distinctio, animi consectetur veritatis minima eaque voluptates.</p>
          </div>
          <div className="btns">
            <button className='close' onClick={closeCardDetails}>Close</button>
          </div>
        </div>
      </div>
  )
}
