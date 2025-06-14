from pydantic import BaseModel, EmailStr
from typing import Dict, Optional

class Permisos(BaseModel):
    cotizaciones: bool = False
    inventario: bool = False
    orden_servicio: bool = False
    garantias: bool = False
    ingresos: bool = False
    egresos: bool = False

class UsuarioCreate(BaseModel):
    nombre: str
    email: EmailStr
    password: str
    permissions: Optional[Dict[str, bool]] = None

class UsuarioLoginOut(BaseModel):
    email: str
    password: str

