
import { Currency } from "./currency";
import { Price } from "./price";

export class Coin {
    private _code : string;
    private _name : string;
    private _price : Price;

    constructor(code : string , name: string, price : number, currency : Currency) {
        this._code = code
        this._name = name
        this._price = new Price(code,price,currency)
    }
    get price() : number {
        return this._price.value
    }
    get currency () : Currency {
        return this._price.currency
    }
    get code() : string {
        return this._code
    }
    get name() : string{
        return this._name
    }
}

export class MyCoin extends Coin {
    private _quantity : number;
    private _averagePurchasePrice ?: number;

    constructor(
        code : string ,
        name: string,
        price : number,
        currency : Currency ,
        quantity: number,
        averagePurchasePrice ?: number){
            super(code, name,price,currency)
            this._quantity = quantity
            this._averagePurchasePrice = averagePurchasePrice
        }
    get quantity() : number {
        return this._quantity
    }
}


export const coinMarket = 
['KRW-BTC', 'KRW-ETH', 'BTC-ETH', 'BTC-XRP', 'BTC-ETC', 'BTC-CVC', 'BTC-DGB', 'BTC-SC', 'BTC-SNT', 'BTC-WAVES', 'BTC-NMR', 'BTC-XEM',
'BTC-QTUM', 'BTC-BAT', 'BTC-LSK', 'BTC-STEEM', 'BTC-DOGE', 'BTC-BNT', 'BTC-XLM', 'BTC-ARDR', 'BTC-ARK', 'BTC-STORJ', 'BTC-GRS', 'BTC-RLC',
'USDT-BTC', 'USDT-ETH', 'USDT-XRP', 'USDT-ETC', 'KRW-NEO', 'KRW-MTL', 'KRW-XRP', 'KRW-ETC', 'KRW-SNT', 'KRW-WAVES', 'KRW-XEM', 'KRW-QTUM',
'KRW-LSK', 'KRW-STEEM', 'KRW-XLM', 'KRW-ARDR', 'KRW-ARK', 'KRW-STORJ', 'KRW-GRS', 'KRW-ADA', 'BTC-ADA', 'BTC-MANA', 'KRW-SBD', 'BTC-SBD', 
'KRW-POWR', 'BTC-POWR', 'KRW-BTG', 'USDT-ADA', 'BTC-DNT', 'BTC-ZRX', 'BTC-TRX', 'BTC-TUSD', 'BTC-LRC', 'KRW-ICX', 'KRW-EOS', 'USDT-TUSD', 
'KRW-TRX', 'BTC-POLYX', 'USDT-SC', 'USDT-TRX', 'KRW-SC', 'KRW-ONT', 'KRW-ZIL', 'KRW-POLYX', 'KRW-ZRX', 'KRW-LOOM', 'BTC-BCH', 'USDT-BCH', 
'KRW-BCH', 'BTC-HIFI', 'BTC-LOOM', 'KRW-BAT', 'KRW-IOST', 'USDT-DGB', 'KRW-CVC', 'KRW-IQ', 'KRW-IOTA', 'BTC-RVN', 'BTC-GO', 'BTC-UPP', 'BTC-ENJ', 
'KRW-HIFI', 'KRW-ONG', 'KRW-GAS', 'BTC-MTL', 'KRW-UPP', 'KRW-ELF', 'USDT-DOGE', 'USDT-ZRX', 'USDT-RVN', 'USDT-BAT', 'KRW-KNC', 'BTC-MOC', 'BTC-ZIL', 
'KRW-BSV', 'BTC-BSV', 'BTC-IOST', 'KRW-THETA', 'BTC-DENT', 'KRW-QKC', 'BTC-ELF', 'KRW-BTT', 'BTC-IOTX', 'BTC-SOLVE', 'BTC-NKN', 'BTC-META', 'KRW-MOC', 
'BTC-ANKR', 'BTC-CRO', 'KRW-ENJ', 'KRW-TFUEL', 'KRW-MANA', 'KRW-ANKR', 'BTC-ORBS', 'BTC-AERGO', 'KRW-AERGO', 'KRW-ATOM', 'KRW-TT', 'KRW-CRE', 'BTC-ATOM', 
'BTC-STPT', 'KRW-MBL', 'BTC-EOS', 'BTC-DAI', 'BTC-MKR', 'BTC-BORA', 'KRW-WAXP', 'BTC-WAXP', 'KRW-HBAR', 'KRW-MED', 'BTC-MED', 'BTC-MLK', 'KRW-MLK', 'KRW-STPT', 
'BTC-VET', 'KRW-ORBS', 'BTC-CHZ', 'KRW-VET', 'BTC-FX', 'BTC-OGN', 'KRW-CHZ', 'BTC-XTZ', 'BTC-HIVE', 'BTC-HBD', 'BTC-OBSR', 'BTC-DKA', 'KRW-STMX', 'BTC-STMX', 'BTC-AHT', 
'KRW-DKA', 'BTC-LINK', 'KRW-HIVE', 'KRW-KAVA', 'BTC-KAVA', 'KRW-AHT', 'KRW-LINK', 'KRW-XTZ', 'KRW-BORA', 'BTC-JST', 'BTC-CHR', 'BTC-DAD', 'BTC-TON', 
'KRW-JST', 'BTC-CTSI', 'BTC-DOT', 'KRW-CRO', 'BTC-COMP', 'BTC-SXP', 'BTC-HUNT', 'KRW-TON', 'BTC-ONIT', 'BTC-CRV', 'BTC-ALGO', 'BTC-RSR', 'KRW-SXP', 
'BTC-OXT', 'BTC-PLA', 'KRW-HUNT', 'BTC-SAND', 'BTC-SUN', 'KRW-PLA', 'KRW-DOT', 'BTC-QTCON', 'BTC-MVL', 'KRW-MVL', 'BTC-REI', 'BTC-AQT', 'BTC-AXS', 
'BTC-STRAX', 'KRW-STRAX', 'KRW-AQT', 'BTC-GLM', 'KRW-GLM', 'BTC-FCT2', 'BTC-SSX', 'KRW-SSX', 'KRW-META', 'KRW-FCT2', 'BTC-FIL', 'BTC-UNI', 'BTC-INJ', 
'BTC-PROM', 'BTC-VAL', 'BTC-PSG', 'BTC-JUV', 'BTC-CBK', 'BTC-FOR', 'KRW-CBK', 'BTC-BFC', 'BTC-LINA', 'BTC-HPO', 'BTC-CELO', 'KRW-SAND', 'KRW-HPO', 'BTC-IQ', 
'BTC-STX', 'KRW-DOGE', 'BTC-NEAR', 'BTC-AUCTION', 'BTC-FLOW', 'BTC-STRK', 'KRW-STRK', 'BTC-PUNDIX', 'KRW-PUNDIX', 'KRW-FLOW', 'KRW-AXS', 'KRW-STX', 'BTC-GRT', 
'BTC-SNX', 'BTC-USDP', 'KRW-XEC', 'KRW-SOL', 'BTC-SOL', 'KRW-MATIC', 'BTC-MATIC', 'KRW-AAVE', 'KRW-1INCH', 'BTC-AAVE', 
'BTC-1INCH', 'BTC-MASK', 'KRW-ALGO', 'BTC-AUDIO', 'KRW-NEAR', 'BTC-YGG', 'BTC-GTC', 'BTC-OCEAN', 'BTC-CTC', 'BTC-LPT', 'KRW-AVAX', 'BTC-AVAX', 'BTC-IMX', 'BTC-RNDR', 
'BTC-RLY', 'KRW-T', 'BTC-T', 'KRW-CELO', 'BTC-RAD', 'BTC-AGLD', 'BTC-API3', 'BTC-ARPA', 'BTC-ENS', 'KRW-GMT', 'BTC-GMT', 'BTC-APE', 'BTC-RAY', 'KRW-APT', 'BTC-APT', 
'BTC-ACM', 'BTC-AFC', 'BTC-ATM', 'BTC-BAR', 'BTC-CITY', 'BTC-INTER', 'BTC-NAP', 'KRW-SHIB', 'BTC-GAL', 'BTC-ASTR', 'BTC-BLUR', 'KRW-MASK', 'BTC-ACS', 'BTC-MAGIC', 'KRW-ARB', 
'BTC-ARB', 'KRW-EGLD', 'BTC-EGLD', 'KRW-SUI', 'BTC-SUI', 'KRW-GRT', 'KRW-BLUR', 'BTC-MINA', 'KRW-IMX', 'BTC-STG', 'BTC-SEI', 'KRW-SEI', 'BTC-CYBER', 'BTC-GLMR']

export const KRWCoin = ['KRW-BTC', 'KRW-ETH', 'KRW-NEO', 'KRW-MTL', 'KRW-XRP', 'KRW-ETC', 'KRW-SNT', 'KRW-WAVES', 'KRW-XEM', 'KRW-QTUM', 'KRW-LSK', 'KRW-STEEM',
'KRW-XLM', 'KRW-ARDR', 'KRW-ARK', 'KRW-STORJ', 'KRW-GRS', 'KRW-ADA', 'KRW-SBD', 'KRW-POWR', 'KRW-BTG', 'KRW-ICX', 'KRW-EOS', 'KRW-TRX', 'KRW-SC', 'KRW-ONT', 
'KRW-ZIL', 'KRW-POLYX', 'KRW-ZRX', 'KRW-LOOM', 'KRW-BCH', 'KRW-BAT', 'KRW-IOST', 'KRW-CVC', 'KRW-IQ', 'KRW-IOTA', 'KRW-HIFI', 'KRW-ONG', 'KRW-GAS', 'KRW-UPP', 
'KRW-ELF', 'KRW-KNC', 'KRW-BSV', 'KRW-THETA', 'KRW-QKC', 'KRW-BTT', 
'KRW-MOC', 'KRW-ENJ', 'KRW-TFUEL', 'KRW-MANA', 'KRW-ANKR', 'KRW-AERGO', 'KRW-ATOM', 'KRW-TT', 'KRW-CRE', 'KRW-MBL', 'KRW-WAXP', 'KRW-HBAR', 'KRW-MED', 'KRW-MLK', 
'KRW-STPT', 
'KRW-ORBS', 'KRW-VET', 'KRW-CHZ', 'KRW-STMX', 'KRW-DKA', 'KRW-HIVE', 'KRW-KAVA', 'KRW-AHT', 'KRW-LINK', 'KRW-XTZ', 'KRW-BORA', 'KRW-JST', 'KRW-CRO', 'KRW-TON', 
'KRW-SXP', 'KRW-HUNT', 'KRW-PLA', 'KRW-DOT', 'KRW-MVL', 'KRW-STRAX', 'KRW-AQT', 'KRW-GLM', 'KRW-SSX', 'KRW-META', 'KRW-FCT2', 'KRW-CBK', 'KRW-SAND', 'KRW-HPO', 
'KRW-DOGE', 'KRW-STRK', 'KRW-PUNDIX', 'KRW-FLOW', 'KRW-AXS', 'KRW-STX', 'KRW-XEC', 'KRW-SOL', 'KRW-MATIC', 'KRW-AAVE', 'KRW-1INCH', 'KRW-ALGO', 'KRW-NEAR', 'KRW-AVAX', 
'KRW-T', 'KRW-CELO', 'KRW-GMT', 'KRW-APT', 'KRW-SHIB', 'KRW-MASK', 'KRW-ARB', 'KRW-EGLD', 'KRW-SUI', 'KRW-GRT', 'KRW-BLUR', 'KRW-IMX', 'KRW-SEI']

export const KRWCoinInfo =  [
{'market': 'KRW-BTC', 'korean_name': '비트코인', 'english_name': 'Bitcoin'} ,
{'market': 'KRW-ETH', 'korean_name': '이더리움', 'english_name': 'Ethereum'} ,
{'market': 'KRW-NEO', 'korean_name': '네오', 'english_name': 'NEO'} ,
{'market': 'KRW-MTL', 'korean_name': '메탈', 'english_name': 'Metal'} ,
{'market': 'KRW-XRP', 'korean_name': '리플', 'english_name': 'Ripple'} ,
{'market': 'KRW-ETC', 'korean_name': '이더리움클래식', 'english_name': 'Ethereum Classic'} ,
{'market': 'KRW-SNT', 'korean_name': '스테이터스네트워크토큰', 'english_name': 'Status Network Token'} ,
{'market': 'KRW-WAVES', 'korean_name': '웨이브', 'english_name': 'Waves'} ,
{'market': 'KRW-XEM', 'korean_name': '넴', 'english_name': 'NEM'} ,
{'market': 'KRW-QTUM', 'korean_name': '퀀텀', 'english_name': 'Qtum'} ,
{'market': 'KRW-LSK', 'korean_name': '리스크', 'english_name': 'Lisk'} ,
{'market': 'KRW-STEEM', 'korean_name': '스팀', 'english_name': 'Steem'} ,
{'market': 'KRW-XLM', 'korean_name': '스텔라루멘', 'english_name': 'Lumen'} ,
{'market': 'KRW-ARDR', 'korean_name': '아더', 'english_name': 'Ardor'} ,
{'market': 'KRW-ARK', 'korean_name': '아크', 'english_name': 'Ark'} ,
{'market': 'KRW-STORJ', 'korean_name': '스토리지', 'english_name': 'Storj'} ,
{'market': 'KRW-GRS', 'korean_name': '그로스톨코인', 'english_name': 'Groestlcoin'} ,
{'market': 'KRW-ADA', 'korean_name': '에이다', 'english_name': 'Ada'} ,
{'market': 'KRW-SBD', 'korean_name': '스팀달러', 'english_name': 'SteemDollars'} ,
{'market': 'KRW-POWR', 'korean_name': '파워렛저', 'english_name': 'Power ledger'} ,
{'market': 'KRW-BTG', 'korean_name': '비트코인골드', 'english_name': 'Bitcoin Gold'} ,
{'market': 'KRW-ICX', 'korean_name': '아이콘', 'english_name': 'Icon'} ,
{'market': 'KRW-EOS', 'korean_name': '이오스', 'english_name': 'EOS'} ,
{'market': 'KRW-TRX', 'korean_name': '트론', 'english_name': 'TRON'} ,
{'market': 'KRW-SC', 'korean_name': '시아코인', 'english_name': 'Siacoin'} ,
{'market': 'KRW-ONT', 'korean_name': '온톨로지', 'english_name': 'Ontology'} ,
{'market': 'KRW-ZIL', 'korean_name': '질리카', 'english_name': 'Zilliqa'} ,
{'market': 'KRW-POLYX', 'korean_name': '폴리매쉬', 'english_name': 'Polymesh'} ,
{'market': 'KRW-ZRX', 'korean_name': '제로엑스', 'english_name': '0x Protocol'} ,
{'market': 'KRW-LOOM', 'korean_name': '룸네트워크', 'english_name': 'Loom Network'} ,
{'market': 'KRW-BCH', 'korean_name': '비트코인캐시', 'english_name': 'Bitcoin Cash'} ,
{'market': 'KRW-BAT', 'korean_name': '베이직어텐션토큰', 'english_name': 'Basic Attention Token'} ,
{'market': 'KRW-IOST', 'korean_name': '아이오에스티', 'english_name': 'IOST'} ,
{'market': 'KRW-CVC', 'korean_name': '시빅', 'english_name': 'Civic'} ,
{'market': 'KRW-IQ', 'korean_name': '아이큐', 'english_name': 'IQ.wiki'} ,
{'market': 'KRW-IOTA', 'korean_name': '아이오타', 'english_name': 'IOTA'} ,
{'market': 'KRW-HIFI', 'korean_name': '하이파이', 'english_name': 'Hifi Finance'} ,
{'market': 'KRW-ONG', 'korean_name': '온톨로지가스', 'english_name': 'ONG'} ,
{'market': 'KRW-GAS', 'korean_name': '가스', 'english_name': 'GAS'} ,
{'market': 'KRW-UPP', 'korean_name': '센티넬프로토콜', 'english_name': 'Sentinel Protocol'} ,
{'market': 'KRW-ELF', 'korean_name': '엘프', 'english_name': 'aelf'} ,
{'market': 'KRW-KNC', 'korean_name': '카이버네트워크', 'english_name': 'Kyber Network'} ,
{'market': 'KRW-BSV', 'korean_name': '비트코인에스브이', 'english_name': 'Bitcoin SV'} ,
{'market': 'KRW-THETA', 'korean_name': '쎄타토큰', 'english_name': 'Theta Token'} ,
{'market': 'KRW-QKC', 'korean_name': '쿼크체인', 'english_name': 'QuarkChain'} ,
{'market': 'KRW-BTT', 'korean_name': '비트토렌트', 'english_name': 'BitTorrent'} ,
{'market': 'KRW-MOC', 'korean_name': '모스코인', 'english_name': 'Moss Coin'} ,
{'market': 'KRW-ENJ', 'korean_name': '엔진코인', 'english_name': 'Enjin'} ,
{'market': 'KRW-TFUEL', 'korean_name': '쎄타퓨엘', 'english_name': 'Theta Fuel'} ,
{'market': 'KRW-MANA', 'korean_name': '디센트럴랜드', 'english_name': 'Decentraland'} ,
{'market': 'KRW-ANKR', 'korean_name': '앵커', 'english_name': 'Ankr'} ,
{'market': 'KRW-AERGO', 'korean_name': '아르고', 'english_name': 'Aergo'} ,
{'market': 'KRW-ATOM', 'korean_name': '코스모스', 'english_name': 'Cosmos'} ,
{'market': 'KRW-TT', 'korean_name': '썬더코어', 'english_name': 'ThunderCore'} ,
{'market': 'KRW-CRE', 'korean_name': '캐리프로토콜', 'english_name': 'Carry Protocol'} ,
{'market': 'KRW-MBL', 'korean_name': '무비블록', 'english_name': 'MovieBloc'} ,
{'market': 'KRW-WAXP', 'korean_name': '왁스', 'english_name': 'WAX'} ,
{'market': 'KRW-HBAR', 'korean_name': '헤데라', 'english_name': 'Hedera'} ,
{'market': 'KRW-MED', 'korean_name': '메디블록', 'english_name': 'MediBloc'} ,
{'market': 'KRW-MLK', 'korean_name': '밀크', 'english_name': 'MiL.k'} ,
{'market': 'KRW-STPT', 'korean_name': '에스티피', 'english_name': 'Standard Tokenization Protocol'} ,
{'market': 'KRW-ORBS', 'korean_name': '오브스', 'english_name': 'Orbs'} ,
{'market': 'KRW-VET', 'korean_name': '비체인', 'english_name': 'VeChain'} ,
{'market': 'KRW-CHZ', 'korean_name': '칠리즈', 'english_name': 'Chiliz'} ,
{'market': 'KRW-STMX', 'korean_name': '스톰엑스', 'english_name': 'StormX'} ,
{'market': 'KRW-DKA', 'korean_name': '디카르고', 'english_name': 'dKargo'} ,
{'market': 'KRW-HIVE', 'korean_name': '하이브', 'english_name': 'Hive'} ,
{'market': 'KRW-KAVA', 'korean_name': '카바', 'english_name': 'Kava'} ,
{'market': 'KRW-AHT', 'korean_name': '아하토큰', 'english_name': 'AhaToken'} ,
{'market': 'KRW-LINK', 'korean_name': '체인링크', 'english_name': 'Chainlink'} ,
{'market': 'KRW-XTZ', 'korean_name': '테조스', 'english_name': 'Tezos'} ,
{'market': 'KRW-BORA', 'korean_name': '보라', 'english_name': 'BORA'} ,
{'market': 'KRW-JST', 'korean_name': '저스트', 'english_name': 'JUST'} ,
{'market': 'KRW-CRO', 'korean_name': '크로노스', 'english_name': 'Cronos'} ,
{'market': 'KRW-TON', 'korean_name': '톤', 'english_name': 'TON'} ,
{'market': 'KRW-SXP', 'korean_name': '솔라', 'english_name': 'SXP'} ,
{'market': 'KRW-HUNT', 'korean_name': '헌트', 'english_name': 'HUNT'} ,
{'market': 'KRW-PLA', 'korean_name': '플레이댑', 'english_name': 'PlayDapp'} ,
{'market': 'KRW-DOT', 'korean_name': '폴카닷', 'english_name': 'Polkadot'} ,
{'market': 'KRW-MVL', 'korean_name': '엠블', 'english_name': 'MVL'} ,
{'market': 'KRW-STRAX', 'korean_name': '스트라티스', 'english_name': 'Stratis'} ,
{'market': 'KRW-AQT', 'korean_name': '알파쿼크', 'english_name': 'Alpha Quark Token'} ,
{'market': 'KRW-GLM', 'korean_name': '골렘', 'english_name': 'Golem'} ,
{'market': 'KRW-SSX', 'korean_name': '썸씽', 'english_name': 'SOMESING'} ,
{'market': 'KRW-META', 'korean_name': '메타디움', 'english_name': 'Metadium'} ,
{'market': 'KRW-FCT2', 'korean_name': '피르마체인', 'english_name': 'FirmaChain'} ,
{'market': 'KRW-CBK', 'korean_name': '코박토큰', 'english_name': 'Cobak Token'} ,
{'market': 'KRW-SAND', 'korean_name': '샌드박스', 'english_name': 'The Sandbox'} ,
{'market': 'KRW-HPO', 'korean_name': '히포크랏', 'english_name': 'Hippocrat'} ,
{'market': 'KRW-DOGE', 'korean_name': '도지코인', 'english_name': 'Dogecoin'} ,
{'market': 'KRW-STRK', 'korean_name': '스트라이크', 'english_name': 'Strike'} ,
{'market': 'KRW-PUNDIX', 'korean_name': '펀디엑스', 'english_name': 'Pundi X'} ,
{'market': 'KRW-FLOW', 'korean_name': '플로우', 'english_name': 'Flow'} ,
{'market': 'KRW-AXS', 'korean_name': '엑시인피니티', 'english_name': 'Axie Infinity'} ,
{'market': 'KRW-STX', 'korean_name': '스택스', 'english_name': 'Stacks'} ,
{'market': 'KRW-XEC', 'korean_name': '이캐시', 'english_name': 'eCash'} ,
{'market': 'KRW-SOL', 'korean_name': '솔라나', 'english_name': 'Solana'} ,
{'market': 'KRW-MATIC', 'korean_name': '폴리곤', 'english_name': 'Polygon'} ,
{'market': 'KRW-AAVE', 'korean_name': '에이브', 'english_name': 'Aave'} ,
{'market': 'KRW-1INCH', 'korean_name': '1인치네트워크', 'english_name': '1inch Network'} ,
{'market': 'KRW-ALGO', 'korean_name': '알고랜드', 'english_name': 'Algorand'} ,
{'market': 'KRW-NEAR', 'korean_name': '니어프로토콜', 'english_name': 'NEAR Protocol'} ,
{'market': 'KRW-AVAX', 'korean_name': '아발란체', 'english_name': 'Avalanche'} ,
{'market': 'KRW-T', 'korean_name': '쓰레스홀드', 'english_name': 'Threshold'} ,
{'market': 'KRW-CELO', 'korean_name': '셀로', 'english_name': 'Celo'} ,
{'market': 'KRW-GMT', 'korean_name': '스테픈', 'english_name': 'Stepn'} ,
{'market': 'KRW-APT', 'korean_name': '앱토스', 'english_name': 'Aptos'} ,
{'market': 'KRW-SHIB', 'korean_name': '시바이누', 'english_name': 'Shiba Inu'} ,
{'market': 'KRW-MASK', 'korean_name': '마스크네트워크', 'english_name': 'Mask Network'} ,
{'market': 'KRW-ARB', 'korean_name': '아비트럼', 'english_name': 'Arbitrum'} ,
{'market': 'KRW-EGLD', 'korean_name': '멀티버스엑스', 'english_name': 'MultiversX'} ,
{'market': 'KRW-SUI', 'korean_name': '수이', 'english_name': 'Sui'} ,
{'market': 'KRW-GRT', 'korean_name': '더그래프', 'english_name': 'The Graph'} ,
{'market': 'KRW-BLUR', 'korean_name': '블러', 'english_name': 'Blur'} ,
{'market': 'KRW-IMX', 'korean_name': '이뮤터블엑스', 'english_name': 'Immutable X'} ,
{'market': 'KRW-SEI', 'korean_name': '세이', 'english_name': 'Sei'} ,
]