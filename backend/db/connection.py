from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
from dotenv import load_dotenv
import os

load_dotenv()

mongo_uri = os.getenv("MONGODB")

try:
    
    client = MongoClient(mongo_uri)
    client.admin.command("ping")   
    db = client["fenix"]

    usuarios_collection = db["usuarios"]
    
    print("✅ Conexión exitosa a MongoDB")
    print("Colecciones disponibles:", db.list_collection_names())
    
except ConnectionFailure:
    print("❌ No se pudo conectar a MongoDB")
except Exception as e:
    print(f"Error inesperado: {e}")
    usuarios_collection = None
