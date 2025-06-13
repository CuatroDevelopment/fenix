
from passlib.context import CryptContext

# Contexto de cifrado con bcrypt
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    """
    Convierte una contraseña en texto plano a una contraseña segura hasheada.
    """
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verifica si la contraseña ingresada coincide con el hash almacenado.
    """
    return pwd_context.verify(plain_password, hashed_password)