import jwt
from datetime import datetime, timedelta, timezone
import os

SECRET_KEY = os.getenv("JWT_SECRET", "clave_predeterminada_insegura")
ALGORITHM = "HS256"

def generar_token_recuperacion(email: str, minutos: int = 15) -> str:
    """
    Genera un token JWT de recuperación de contraseña.

    Args:
        email (str): Correo electrónico del usuario.
        minutos (int, opcional): Tiempo de expiración del token en minutos. Por defecto es 15.

    Returns:
        str: Token JWT codificado que incluye el correo del usuario y su tiempo de expiración.
    """
    datos = {
        "sub": email,
        "exp": datetime.now(timezone.utc) + timedelta(minutes=minutos)
    }
    return jwt.encode(datos, SECRET_KEY, algorithm=ALGORITHM)

def verificar_token_recuperacion(token: str) -> str:
    """
    Verifica un token JWT de recuperación de contraseña.

    Args:
        token (str): Token JWT que se desea validar.

    Returns:
        str: El correo electrónico (campo "sub") contenido en el token si es válido.

    Raises:
        ValueError: Si el token ha expirado o es inválido.
    """
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload["sub"]
    except jwt.ExpiredSignatureError:
        raise ValueError("El token ha expirado")
    except jwt.InvalidTokenError:
        raise ValueError("Token inválido")