
db = db.getSiblingDB('fenix')

db.createUser({
  user: "fenix_user",
  pwd: "fenix_password",
  roles: [
    { role: "readWrite", db: "fenix" }
  ]
});

// Catálogo de permisos
db.permisos.insertMany([
  { _id: 1, nombre: "crear_usuario" },
  { _id: 2, nombre: "editar_permisos"},
  { _id: 3, nombre: "crear_cotizaciones"},
  { _id: 3, nombre: "crear_cotizaciones"},
  { _id: 4, nombre: "crear_orden_servicio"},
  { _id: 5, nombre: "ver_orden_servicio"}
]);

db.usuarios.insertOne({
  nombre: "admin",
  email: "admin@fenix.com",
  activo: true,
  permisos: [1, 2, 3, 4]  // Referencias a los IDs de los permisos
});

db.cotizacion.insertOne({
  numero: "COT-001",
  Descripcion: "Descricion de prueba",
  unidad: "ml",
  costo_unidad: 200,
  cantidad: 150,
  costo_total: 30000,
  estado: "aprobado o desaprobado",
});

db.oden_servicio.insertOne({
  folio: "829202",
  tipo_actividad: "Actividad que ofrece la empresa",
  inmueble: "Tipo de inmueble casa,oficina",
  area: "Tipo area externa o interna",
  nombre_cliente: "David Sanchez Martinez",
  domicilio: "Benito Juarez #10",
  telefono: "461 789  1789",
  estado_instalaciones: "Descripcion del estado de las instalaciones",
  fecha_servicio: new Date(),
  hora_servicio: "11:30",
  materia_prima: "limpiador",
  categoria_materia: "impiador suelo",
  total: 10000
});

db.inventariop.insertOne({
  fecha: new Date(),
  producto: "producto generico",
  descripcion: "producto generico limpieza",
  cantidad: 100,
  precio_unitario: 100,
  tipo_movimiento: "entrada o salida"
});


db.ingresos.insertOne({
  fecha:new Date(),
  ingreso: 1000,
  ingreso_sin_iva: 0,
  ingreso_con_iva: 1160,
  iva: 160,
  tipo_pago: "tranferencia, efectivo, por cobrar",
  fecha_cobro: new Date()
});

db.egresos.insertOne({
  fecha:new Date(),
  ingreso: 1000,
  ingreso_sin_iva: 0,
  ingreso_con_iva: 1160,
  iva: 160,
  tipo_pago: "tranferencia, efectivo, por cobrar",
  fecha_cobro: new Date()
});


