from pydantic import BaseModel, EmailStr
from typing import Dict, Optional

class Permisos(BaseModel):
    """
    El modelo define de permisos especifica el tipo de dato 
    que debe recibir con el fin de validad los datos de entrada.
    el modelo de permisos recibe todos los datos de tipo booleano\n
    
     -cotizaciones: bool \n
     -inventario: bool \n
     -orden_servicio: bool \n
     -garantias: bool \n
     -ingresos: bool \n
     -egresos: bool 
    """
    cotizaciones: bool = False
    inventario: bool = False
    orden_servicio: bool = False
    garantias: bool = False
    ingresos: bool = False
    egresos: bool = False

class UsuarioCreate(BaseModel):
    """
    El modelo define de UsuarioCreate especifica el tipo de dato 
    que debe recibir una vez que se crea un nuevo colaborador con 
    el fin de validad los datos de entrada.
    
    Args: 
        nombre: str \n
        email: EmailStr \n
        password: str \n
        permissions: Optional[Permisos] 
    """
    nombre: str
    email: EmailStr
    password: str
    permissions: Optional[Permisos] = None

class UsuarioLoginOut(BaseModel):
    """
    El modelo define de LoginOut especifica el tipo de dato 
    que debe recibir cuando el colaborador inicia sesion con 
    el fin de validad los datos de entrada.
    
    Args: 
        email: str \n
        password: str 
    """
    email: str
    password: str

class Recuperacion(BaseModel):
    email: str

