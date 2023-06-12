import { Currency, exchangeValue } from "../domain/Domain"
import { Price } from "../domain/price"
import { MyStock } from "../domain/stock"

test("price Testing...",() => {
    const dollar = new Price("110202", 20000, Currency.USD)
    const won = new Price("1312321", 211, Currency.KRW)
    
})