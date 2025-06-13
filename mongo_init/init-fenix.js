
db = db.getSiblingDB('fenix')

db.usuario.insertMany([
  {
    nombre: "Admin Principal",
    email: "admin@fenix.com",
    password: "hashedpassword",
    permissions: {
      cotizaciones: true,
      inventario: true,
      orden_servicio: true,
      garantias: true, 
      ingresos: true, 
      egresos: true
    },
  }
]);
