import  {  useState } from 'react'
import Input from './Input'
import styled from 'styled-components'
import Button from './Button';


const StyledLayout = styled.div`
    width:100%;
    height:100%;
    padding: 0 1rem;
    background-color: yellow;
`
const ButtonArea = styled.div`
  display:inline-block;
  width:20%;
  height:100%;
`
const StyledEditButton = styled(Button)`
  width:1rem;
  height:1rem;
  
  background-color: gray;
  color: white;
  display:flex;
  justify-content:center;
  align-items:center;
`
const StyledSpan = styled.span.attrs({className: "material-symbols-outlined" })`

`
const EditableInput = () => {
  const [isEditing, setIsEditing] = useState(false)
  const handleClick = () => {
    setIsEditing(!isEditing)

  }
  return (
    <StyledLayout>
        <Input $responsive defaultText='코드'  readOnly={!isEditing} />
        <ButtonArea>
          <StyledEditButton $primary onClick={handleClick}>
              <StyledSpan >edit_square</StyledSpan>
          </StyledEditButton>
        </ButtonArea>

    </StyledLayout>
    

  )
}

export default EditableInput