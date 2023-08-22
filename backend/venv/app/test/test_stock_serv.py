from decimal import Decimal
from fastapi.testclient import TestClient
from main import app
from service.stock_service import StockService
from domain.schema.stock import StockPriceListOutPut, StockPrice, StockPriceResponseOfKorInvAPI
from domain.schema.market import Market
from pytest import mark

client = TestClient(app)
input_data = ["TEST","ㅂㅈㄷㄱㅁㄴㅇ"]
market = Market.KRX
overseas_test_stock_response = {
"output": {
    "rsym": "DNASTSLA",
    "zdiv": "4",
    "base": "1091.2600",
    "pvol": "26691673",
    "last": "1091.2600",#현재가
    "sign": "0",
    "diff": "0.0000",
    "rate": " 0.00",
    "tvol": "0",
    "tamt": "0",
    "ordy": "매도불가"
},
"rt_cd": "0",
"msg_cd": "MCA00000",
"msg1": "정상처리 되었습니다."
}
domestic_test_stock_response = {
"output": {
    "iscd_stat_cls_code": "55",
    "marg_rate": "20.00",
    "rprs_mrkt_kor_name": "KOSPI200",
    "bstp_kor_isnm": "전기.전자",
    "temp_stop_yn": "N",
    "oprc_rang_cont_yn": "N",
    "clpr_rang_cont_yn": "N",
    "crdt_able_yn": "Y",
    "grmn_rate_cls_code": "40",
    "elw_pblc_yn": "Y",
    "stck_prpr": "128500",#현재가
    "prdy_vrss": "0",
    "prdy_vrss_sign": "3",
    "prdy_ctrt": "0.00",
    "acml_tr_pbmn": "344570137500",
    "acml_vol": "2669075",
    "prdy_vrss_vol_rate": "75.14",
    "stck_oprc": "128500",
    "stck_hgpr": "130000",
    "stck_lwpr": "128500",
    "stck_mxpr": "167000",
    "stck_llam": "90000",
    "stck_sdpr": "128500",
    "wghn_avrg_stck_prc": "129097.23",
    "hts_frgn_ehrt": "49.48",
    "frgn_ntby_qty": "0",
    "pgtr_ntby_qty": "287715",
    "pvt_scnd_dmrs_prc": "131833",
    "pvt_frst_dmrs_prc": "130166",
    "pvt_pont_val": "128333",
    "pvt_frst_dmsp_prc": "126666",
    "pvt_scnd_dmsp_prc": "124833",
    "dmrs_val": "129250",
    "dmsp_val": "125750",
    "cpfn": "36577",
    "rstc_wdth_prc": "38500",
    "stck_fcam": "5000",
    "stck_sspr": "97660",
    "aspr_unit": "500",
    "hts_deal_qty_unit_val": "1",
    "lstn_stcn": "728002365",
    "hts_avls": "935483",
    "per": "19.67",
    "pbr": "1.72",
    "stac_month": "12",
    "vol_tnrt": "0.37",
    "eps": "6532.00",
    "bps": "74721.00",
    "d250_hgpr": "149500",
    "d250_hgpr_date": "20210225",
    "d250_hgpr_vrss_prpr_rate": "-14.05",
    "d250_lwpr": "90500",
    "d250_lwpr_date": "20211013",
    "d250_lwpr_vrss_prpr_rate": "41.99",
    "stck_dryy_hgpr": "132500",
    "dryy_hgpr_vrss_prpr_rate": "-3.02",
    "dryy_hgpr_date": "20220103",
    "stck_dryy_lwpr": "121500",
    "dryy_lwpr_vrss_prpr_rate": "5.76",
    "dryy_lwpr_date": "20220105",
    "w52_hgpr": "149500",
    "w52_hgpr_vrss_prpr_ctrt": "-14.05",
    "w52_hgpr_date": "20210225",
    "w52_lwpr": "90500",
    "w52_lwpr_vrss_prpr_ctrt": "41.99",
    "w52_lwpr_date": "20211013",
    "whol_loan_rmnd_rate": "0.22",
    "ssts_yn": "Y",
    "stck_shrn_iscd": "000660",
    "fcam_cnnm": "5,000",
    "cpfn_cnnm": "36,576 억",
    "frgn_hldn_qty": "360220601",
    "vi_cls_code": "N",
    "ovtm_vi_cls_code": "N",
    "last_ssts_cntg_qty": "43916",
    "invt_caful_yn": "N",
    "mrkt_warn_cls_code": "00",
    "short_over_yn": "N",
    "sltr_yn": "N"
},
    "rt_cd": "0",
    "msg_cd": "MCA00000",
    "msg1": "정상처리 되었습니다!"
}
def test_stock_price_equality():
    test_response_mock_up = StockPriceResponseOfKorInvAPI(**overseas_test_stock_response)
    test_response_mock_up2 = StockPriceResponseOfKorInvAPI(**domestic_test_stock_response)
    assert test_response_mock_up.output.price == "1091.2600"
    assert test_response_mock_up2.output.price == "128500"
    test_stock_price1= StockPrice(**{
        "code": "228670",
        "market" : "KRX",
        "price": 40300,
    })
    test_stock_price2 = StockPrice(**{
        "code": "228670",
        "market" : "KRX",
        "price": 1.1234,        
    })
    
    assert test_stock_price1 == StockPrice(**{
            "code": "228670",
            "market" : "KRX",
            "price": 40300,
    })

    assert test_stock_price1 != test_stock_price2
    assert test_stock_price2.price == Decimal("1.1234")

@mark.parametrize("code,market,price",[
    ("test1234","KRX",123),
    ("teST1234","KRX",123.00)
])
def test_stock_service_read_from_db(code,market,price):
    already_inserted_stock_price = StockPrice(**{
        "code": code,
        "market" : market,
        "price": price, 
    })
    result = StockService.price_read_from_db(code, market)
    assert StockPrice(**result.dict()) == already_inserted_stock_price

@mark.parametrize("code,market",[
    ("TSLA","NAS"),
    ("228670","KRX")
])
def test_stock_service_read_from_api(code,market):
    result = StockService.price_read_from_api(code,market)
    expect_result = StockPrice(**{
        "code": code,
        "market" : market,
        "price" : result.price
    })
    
    assert result == expect_result

@mark.parametrize("code,market",[
    ("qwe","KRX"),
    ("QASDZXC","NAS")
])
def test_stock_service_read_from_api_expect_none(code,market):
    result = StockService.price_read_from_api(code,market)
    assert result is None


def test_doemstic_stock_service():
    result : StockPriceListOutPut = StockService.current_price_list(input_data,market)
    check_stock_price_list_output_model = {
        "output":[StockPrice(**{
            "code": "TEST",
            "market" : "KRX",
            "price": 1234,
            })
        ],
        "fail_input" : ["ㅂㅈㄷㄱㅁㄴㅇ"]
    }
    assert result == check_stock_price_list_output_model


