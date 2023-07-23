import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import { assetsState } from '../atom/atom'
import { MyStock, Stock } from '../domain/stock'
import { Currency, testRealData } from '../domain/Domain'
import { MyCoin } from '../domain/coin'

const StyledDiv = styled.div`
    outline: auto;
    width: 100%;
    

`
const StyledSelect = styled.select`
    border-radius : 0.5rem;
`
const StyledOption = styled.option`
    border-radius : 0.5rem;
    background-color : yellow;
`
const H2 = styled.h2`
    display: inline-block;
`
const P = styled.p`
    display: inline-block;
    
`
interface assetsInput{
    category: string;
    code: string;
    quantity: number;
    name: string;
    price: number;
}

const AssetsInput : React.FC = () => {
    const [assetsInput, setAssetsInput] = useState<assetsInput>({
        category: '',
        code: '',
        quantity: 0,
        name : '',
        price: 0,
    })
    const [myAssets , setMyAssets] = useRecoilState(assetsState)
    
    const handleInputChange = (e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name , value} = e.target
        setAssetsInput((preValue ) => ({
            ...preValue,
            [name]: name === 'quantity' || name === 'price' ? Number(value) : value,
        }))
    }
    const handleClick = () => {
        switch(assetsInput.category){
            case 'stock':
                const stock = new MyStock(assetsInput.code,assetsInput.name,assetsInput.price,Currency.KRW,assetsInput.quantity)
                setMyAssets((prevAssets) => ({
                    ...prevAssets,
                    stocks: [...prevAssets?.stocks as MyStock[] , stock,]
                }))
                break;
            case 'coin':
                const coin : MyCoin = new MyCoin(assetsInput.code,assetsInput.name,assetsInput.price,Currency.KRW,assetsInput.quantity)
                setMyAssets((prevAssets) => ({
                    ...prevAssets,
                    coins: [...prevAssets?.coins as MyCoin[] , coin,]
                }))
                break;
        }
    }
    const handleClick2 = () => {
        setMyAssets(testRealData)
    }
    const handleClick3 = () => {
        setMyAssets({
            stocks: [],
            cash: [],
            coins: [],
        })
    }
    const handleClick4 = () => {

    }
  return (
    <StyledDiv>
        <H2>
            분류 : 
        </H2>
        <StyledSelect name='category' value={assetsInput.category}  onChange={handleInputChange} >
                <StyledOption value='' >--선택--</StyledOption>
                <option value='stock' >주식</option>
                <option value='coin'>코인</option>
                <option value='cash'>현금</option>
        </StyledSelect>
        <P> 코드: <input type='text' name="code" value={assetsInput.code}  onChange={handleInputChange} required /></P>
        <P> 수량:<input type='number' name="quantity" value={assetsInput.quantity}  onChange={handleInputChange} required /></P>
        <P> 이름:<input type='text' name="name" value={assetsInput.name}  onChange={handleInputChange} required /></P>
        <P> 현재가:<input type='number' name="price" value={assetsInput.price}  onChange={handleInputChange} required /></P>
        <button type="button" className="btn btn-primary" onClick={handleClick}>입력</button>
        <button type="button" className="btn btn-primary" onClick={handleClick2}>테스트 데이터 리코일 저장</button>
        <button type="button" className="btn btn-primary" onClick={handleClick3}>초기화</button>
        <button type="button" className="btn btn-primary" onClick={handleClick4}>데이터 불러오기</button>
        {/* <P>{JSON.stringify(assetsInput)}</P> */}
        <br />
        <P>{JSON.stringify(myAssets)}</P>
    </StyledDiv>
  )
}

export default AssetsInput