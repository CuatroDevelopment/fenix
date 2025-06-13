from fastapi import FastAPI
from routes.usuarios import router as usuarios_router

app = FastAPI()

app.include_router(usuarios_router)


@app.get("/")
def read_root():
    return {"message": "Bienvenido a mi API con FastAPI"}
