from fastapi import APIRouter, HTTPException
from models.usuario_model import UsuarioCreate
from db import db  # Conexión a MongoDB
from utils.password_handler import hash_password  # Función para hashear
from bson import ObjectId

router = APIRouter(prefix="/auth", tags=["Autenticación"])

@router.post("/register")
def register(usuario: UsuarioCreate):
    # 1. Validar si el email ya está registrado
    if db.usuario.find_one({"email": usuario.email}):
        raise HTTPException(status_code=400, detail="El correo ya está registrado")
    
    # 2. Hashear la contraseña
    hashed_password = hash_password(usuario.password)
    
    # 3. Convertir el objeto Pydantic a dict y reemplazar la contraseña
    nuevo_usuario = usuario.dict()
    nuevo_usuario["password"] = hashed_password

    # 4. Insertar en MongoDB
    resultado = db.usuario.insert_one(nuevo_usuario)

    # 5. Retornar solo el ID del nuevo usuario
    return {
        "id": str(resultado.inserted_id),
        "message": "Usuario registrado exitosamente"
    }
