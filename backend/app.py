from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.usuarios import router as usuarios_router

app = FastAPI()

app.include_router(usuarios_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Bienvenido a mi API con FastAPI"}