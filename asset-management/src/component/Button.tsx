import React from 'react'

export interface ButtonProps {
    onClick?: (e:React.MouseEvent) => void;
    children?:React.ReactNode;
    option?: string;
  }
const Button : React.FC<ButtonProps>= (props) => {
    const {children,option, ...rest} = props;
    let classString = "btn btn"
    if(option){
        classString += '-'+ option
    }
  return (
    <React.Fragment>
        <button type="button" className={classString} {...rest} >{children}</button>
    </React.Fragment>

  )
}

export default Button