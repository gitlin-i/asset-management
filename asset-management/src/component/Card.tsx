import React from 'react'
interface CardProps {
    title ?: string;
    body ?: any;
    children ?: React.ReactNode;
}

const Card : React.FC<CardProps> = (props) => {
    const {title, body, children, ...rest} = props
  return (
    <div className="card">
  <div className="card-header">
    {title}
  </div>
  <div className="card-body" style={{height: "100%" }}>
  
    <blockquote className="blockquote mb-0">
      <p>{body}</p>
      
      {/* <footer className="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer> */}
    </blockquote>
  </div>
</div>
  )
}

export default Card