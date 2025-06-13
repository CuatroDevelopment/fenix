from pydantic import BaseModel, EmailStr
from typing import Optional

class Permisos(BaseModel):
    cotizaciones: bool
    inventario: bool
    orden_servicio: bool
    garantias: bool
    ingresos: bool
    egresos: bool

class UsuarioCreate(BaseModel):
    nombre: str
    email: EmailStr
    password: str
    permissions: Optional[Permisos]

class UsuarioOut(BaseModel):
    id: str
    nombre: str
    email: str
