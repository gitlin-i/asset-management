import asyncio
from typing import AsyncGenerator

async def a_ge(j):
    for i in range(j):
        print("before yield!")
        await asyncio.sleep(1)
        yield i
        await asyncio.sleep(1)
        print("after yield!")

async def b(g : AsyncGenerator = a_ge(3) ):

    async for i in g:
        return i + 100

async def main(ge: AsyncGenerator):
    print("Start!!")
    async for i in ge:
        print("main: " + str(i))
        print("next")

async def main2(ge):
    print("Start!!")
    a= await ge
    print(a)


asyncio.run(main2(b))