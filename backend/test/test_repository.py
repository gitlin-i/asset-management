from sqlalchemy.orm import Session
from sqlalchemy import select, insert, update, delete, bindparam
from domain.schema.test import Test as schema
from domain.model.test import Test as model
from abc import ABCMeta
class TestRepository:

    def read_test(db: Session, id :int):
        stmt = select(model).where(model.id == id)
        # result = db.execute(stmt)
        res = db.scalar(stmt)
        # res = [ test for test in result.scalars()]

        print(res)
        return res

    def create_test(db :Session, test: schema):
        mapped_test = model(**test.dict())
        db.add(mapped_test)
        db.commit()
        return mapped_test

    def update_test(db :Session, test: schema, testId: int ):
        # stmt = update(model).where(model.id == testId)
        # result = db.connection().execute(stmt,[test.dict()])

        stmt = select(model).where(model.id == testId)
        test_one= db.scalars(stmt).one()
        test_one.name = test.name
        db.commit()
        return test_one

    def delete_test(db :Session, id: int):
        target = db.get(model,id)
        db.delete(target)
        db.commit()
        return target
