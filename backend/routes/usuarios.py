from fastapi import APIRouter, Body, HTTPException
from models.usuario_model import UsuarioCreate, UsuarioLoginOut
from db.connection import usuarios_collection
from utils.password_handler import hash_password, verify_password
import logging

router = APIRouter(prefix="/usuarios", tags=["Usuarios"])

@router.post("/registro")
def registro(usuario: UsuarioCreate):
    if usuarios_collection.find_one({"email": usuario.email}):
        raise HTTPException(status_code=400, detail="El correo ya está registrado")
    
    hashed_password = hash_password(usuario.password)
    nuevo_usuario = usuario.dict()
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

@router.post("/login")
def login(credenciales: UsuarioLoginOut): 
    usuario = usuarios_collection.find_one({"email": credenciales.email})
    print("correo: ", credenciales.email)
    if not usuario:
        raise HTTPException(status_code=401, detail="Correo  incorrectos")

    if not verify_password(credenciales.password, usuario["password"]):
        print("contraseña: ", credenciales.password)
        raise HTTPException(status_code=401, detail="contraseña incorrectos")

    # Aquí puedes devolver un token JWT o simplemente un mensaje de éxito
    return {"message": "Login exitoso", "user_id": str(usuario["_id"])}

@router.get("/dashboard")
def Dashboard (email: str):
    usuario = usuarios_collection.find_one({"email": email})
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    return {
        "permissions": usuario.get("permissions", {})
    }