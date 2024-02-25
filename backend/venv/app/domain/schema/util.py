
from decimal import Decimal

def is_in_db_decimal_range(integer_range = 9, decimal_digits_range = 8):
    
    def validate_decimal_range(v: Decimal) -> Decimal:
        if isinstance(v,Decimal):
            metadata = v.as_tuple()
            decimal_digits = abs(metadata.exponent)
            integer_digits = len(metadata.digits) - decimal_digits
            if decimal_digits > decimal_digits_range or integer_digits > integer_range:
                raise ValueError("out of decimal range")
            return v
        else:
            raise ValueError("Decimal이 아닙니다.")
    return validate_decimal_range

def count_digits(target_number: int | float)-> tuple[int, int]:
    if isinstance(target_number, (int, float)):
        parse_number = str(target_number).split('.')
        if len(parse_number) == 1 :
            return (len(parse_number[0]) , 0)
        return (len(parse_number[0]), len(parse_number[-1]))
    else:
        raise TypeError
    


    

    