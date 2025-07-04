-- CreateEnum
CREATE TYPE "estado_pedido_enum" AS ENUM ('colocado', 'en_proceso', 'completado', 'cancelado');

-- CreateEnum
CREATE TYPE "estado_reserva_enum" AS ENUM ('solicitada', 'confirmada', 'cancelada', 'completada');

-- CreateEnum
CREATE TYPE "rol_usuario_enum" AS ENUM ('cliente', 'administrador');

-- CreateEnum
CREATE TYPE "tipo_rol" AS ENUM ('usuario', 'administrador');

-- CreateTable
CREATE TABLE "categorias" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "descripcion" TEXT,

    CONSTRAINT "categorias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "detallespedido" (
    "pedido_id" INTEGER NOT NULL,
    "producto_id" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "precio_unitario" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "detallespedido_pkey" PRIMARY KEY ("pedido_id","producto_id")
);

-- CreateTable
CREATE TABLE "likesblog" (
    "publicacion_id" INTEGER NOT NULL,
    "usuario_id" INTEGER NOT NULL,

    CONSTRAINT "likesblog_pkey" PRIMARY KEY ("publicacion_id","usuario_id")
);

-- CreateTable
CREATE TABLE "pedidos" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "fecha_pedido" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estado" "estado_pedido_enum" NOT NULL DEFAULT 'colocado',
    "total" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "pedidos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "productos" (
    "id" SERIAL NOT NULL,
    "categoria_id" INTEGER NOT NULL,
    "nombre" VARCHAR(255) NOT NULL,
    "descripcion_breve" VARCHAR(255),
    "descripcion_detallada" TEXT,
    "ingredientes" TEXT,
    "precio" DECIMAL(10,2) NOT NULL,
    "imagen_url" VARCHAR(2048),

    CONSTRAINT "productos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Blog" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "resumen" TEXT NOT NULL,
    "contenido_completo" TEXT NOT NULL,
    "imagen_url" TEXT NOT NULL,
    "autor" TEXT NOT NULL,
    "fecha_publicacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "publicacionesblog" (
    "id" SERIAL NOT NULL,
    "autor_id" INTEGER NOT NULL,
    "titulo" VARCHAR(255) NOT NULL,
    "contenido" TEXT NOT NULL,
    "fecha_creacion" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(6),
    "imagen_url" VARCHAR(255),
    "contador_likes" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "publicacionesblog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reservas" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER,
    "nombre_cliente" VARCHAR(150),
    "contacto_cliente" VARCHAR(255),
    "fecha" DATE NOT NULL,
    "hora" TIME(6) NOT NULL,
    "numero_comensales" INTEGER NOT NULL,
    "estado" "estado_reserva_enum" NOT NULL DEFAULT 'solicitada',

    CONSTRAINT "reservas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(150) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "contrasena_hash" VARCHAR(255) NOT NULL,
    "fecha_registro" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rol" "tipo_rol" NOT NULL DEFAULT 'usuario',

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categorias_nombre_key" ON "categorias"("nombre");

-- CreateIndex
CREATE INDEX "idx_pedidos_usuario_id" ON "pedidos"("usuario_id");

-- CreateIndex
CREATE INDEX "idx_productos_categoria_id" ON "productos"("categoria_id");

-- CreateIndex
CREATE INDEX "idx_publicaciones_autor_id" ON "publicacionesblog"("autor_id");

-- CreateIndex
CREATE INDEX "idx_reservas_fecha" ON "reservas"("fecha");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- AddForeignKey
ALTER TABLE "detallespedido" ADD CONSTRAINT "fk_pedido" FOREIGN KEY ("pedido_id") REFERENCES "pedidos"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "detallespedido" ADD CONSTRAINT "fk_producto" FOREIGN KEY ("producto_id") REFERENCES "productos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "likesblog" ADD CONSTRAINT "fk_publicacion" FOREIGN KEY ("publicacion_id") REFERENCES "publicacionesblog"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "likesblog" ADD CONSTRAINT "fk_usuario" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pedidos" ADD CONSTRAINT "fk_usuario" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "productos" ADD CONSTRAINT "fk_categoria" FOREIGN KEY ("categoria_id") REFERENCES "categorias"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "publicacionesblog" ADD CONSTRAINT "fk_autor" FOREIGN KEY ("autor_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reservas" ADD CONSTRAINT "fk_usuario" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
