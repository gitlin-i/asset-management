from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/login")
async def login(userId : str ,password : str):
    return {
        "userId": userId,
        "password" : password
    }