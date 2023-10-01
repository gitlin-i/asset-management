
import { Currency } from "../domain/currency"
import { Price } from "../domain/price"


test("price Testing...",() => {
    const dollar = new Price("110202", 20000, Currency.USD)
    const won = new Price("1312321", 211, Currency.KRW)
    
})