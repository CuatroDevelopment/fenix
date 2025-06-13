from fastapi import APIRouter, HTTPException
from models.usuario_model import UsuarioCreate
from db.connection import usuarios_collection
from utils.password_handler import hash_password
import logging

router = APIRouter(prefix="/usuarios", tags=["Usuarios"])

@router.post("/registro")
def registro(usuario: UsuarioCreate):
    if usuarios_collection.find_one({"email": usuario.email}):
        raise HTTPException(status_code=400, detail="El correo ya está registrado")
    
    hashed_password = hash_password(usuario.password)
    nuevo_usuario = usuario.model_dump()  # o usuario.dict() según Pydantic
    nuevo_usuario["password"] = hashed_password

    # Asignar permisos por defecto si no vienen
    if not nuevo_usuario.get("permissions"):
        nuevo_usuario["permissions"] = {
            "cotizaciones": False,
            "inventario": False,
            "orden_servicio": False,
            "garantias": False,
            "ingresos": False,
            "egresos": False,
        }

    try:
        resultado = usuarios_collection.insert_one(nuevo_usuario)
    except Exception as e:
        logging.error(f"Error al registrar usuario: {e}")
        raise HTTPException(status_code=500, detail="Error interno al registrar usuario")

    return {
        "id": str(resultado.inserted_id),
        "message": "Usuario registrado exitosamente"
    }
