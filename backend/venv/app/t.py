from pydantic import BaseModel, Field
class ABS(BaseModel):
    asd: str
    qwe: str = Field(...,alias="zxc")
    


qq= ABS(asd="aasdasdasda",zxc="zxczxcxz")
# qqq= ABS(**{
#     "asd":"qweqweqew",
#     "qwe": "asdasdassda"
# })

print(qq)