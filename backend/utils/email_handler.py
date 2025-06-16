import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv
from pathlib import Path as SysPath

env_path = SysPath(__file__).resolve().parents[2] / ".env"
load_dotenv(dotenv_path=env_path)

def enviar_correo_recuperacion(destinatario: str, enlace: str):
    """
    Envía un correo electrónico con el enlace de recuperación de contraseña.

    Args:
        destinatario (str): Correo del usuario que solicitó la recuperación.
        enlace (str): URL con el token JWT para restablecer la contraseña.
    """

    remitente = os.getenv("EMAIL_REMITENTE")
    contraseña = os.getenv("EMAIL_PASSWORD")
    smtp_host = os.getenv("EMAIL_HOST", "smtp.gmail.com")
    smtp_puerto = int(os.getenv("EMAIL_PORT", "587"))  # <-- CAMBIADO A 587
    
    print(f"EMAIL_REMITENTE: {os.getenv('EMAIL_REMITENTE')}")
    print(f"EMAIL_PASSWORD: {os.getenv('EMAIL_PASSWORD')}")


    mensaje = MIMEMultipart("alternative")
    mensaje["Subject"] = "Recuperación de contraseña"
    mensaje["From"] = remitente
    mensaje["To"] = destinatario

    texto = f"Haz clic en este enlace para recuperar tu contraseña: {enlace}"
    html = f"""
    <html>
      <body>
        <p>Hola,<br>
           Has solicitado restablecer tu contraseña.<br><br>
           <a href="{enlace}">Haz clic aquí para cambiar tu contraseña</a><br><br>
           Si no fuiste tú, puedes ignorar este mensaje.
        </p>
      </body>
    </html>
    """

    mensaje.attach(MIMEText(texto, "plain"))
    mensaje.attach(MIMEText(html, "html"))

    try:
        with smtplib.SMTP(smtp_host, smtp_puerto) as server:
            server.starttls()  # <-- IMPORTANTE
            server.login(remitente, contraseña)
            server.sendmail(remitente, destinatario, mensaje.as_string())
        print(f"✅ Correo enviado a {destinatario}")
    except Exception as e:
        print(f"❌ Error al enviar correo: {e}")
