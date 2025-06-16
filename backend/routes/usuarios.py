
from fastapi import APIRouter, HTTPException
from utils.email_handler import enviar_correo_recuperacion
from utils.jwt_handler import generar_token_recuperacion, verificar_token_recuperacion
from models.usuario_model import NuevaContrasena, UsuarioCreate, UsuarioLoginOut, Recuperacion
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

    
    return {"message": "Login exitoso", "user_id": str(usuario["_id"])}

@router.get("/dashboard")
def Dashboard (email: str):
    usuario = usuarios_collection.find_one({"email": email})
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    return {
        "permissions": usuario.get("permissions", {})
    }

@router.post("/recuperar")
async def solicitar_recuperacion(data: Recuperacion):
    usuario = usuarios_collection.find_one({"email": data.email})
    if not usuario:
        raise HTTPException(status_code=404, detail="Correo no encontrado")

    token = generar_token_recuperacion(data.email)
    print(f"token: {token}")
    enlace = f"http://localhost:5173/reset-password?token={token}"
    enviar_correo_recuperacion(data.email, enlace)
    return {"mensaje": "Correo de recuperación enviado"}

@router.post("/restablecer-password")
async def restablecer_password(data: NuevaContrasena):
    try:
        email = verificar_token_recuperacion(data.token)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    
    usuario = usuarios_collection.find_one({"email": email})
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    resultado = usuarios_collection.update_one(
        {"email": email},
        {"$set": {"password": hash_password(data.nueva_password)}}

    )

    if resultado.modified_count == 0:
        raise HTTPException(status_code=404, detail="Usuario no encontrado o sin cambios")

    return {"mensaje": "Contraseña actualizada correctamente"}