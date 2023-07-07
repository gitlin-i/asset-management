from fastapi import APIRouter, Depends

from domain.schema.test import Test 

from database import SessionLocal
from sqlalchemy.orm import Session
from service.test_service import TestService
router = APIRouter(
    prefix="/test"
)

def get_db() :
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("",response_model= Test)
async def test(someId: int, db: Session = Depends(get_db)): 
    result = TestService().read(db,someId) 
    return result

@router.post("",response_model= Test) 
async def test(test : Test, db: Session = Depends(get_db)):
    result = TestService().create(db, test)
    return result

@router.put("/{testId}",response_model= Test)
async def test(updateTest: Test, testId: int,  db: Session = Depends(get_db)):
    result = TestService().update(db, testId, updateTest)
    return result

@router.delete("/{testId}",response_model= Test)
async def test(testId: int, db: Session = Depends(get_db)):
    result = TestService().delete(db,testId )
    return result