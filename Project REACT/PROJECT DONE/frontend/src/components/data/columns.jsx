export const COLUMNS_ALMACENES = [
    {
        Header: "ID",
        accessor: "id",
    },
    {
        Header: "Region",
        accessor: "region.nombre",
    },
    {
        Header: "Direccion",
        accessor: "direccion",
    },
    {
        Header: "CP",
        accessor: "cod_postal",
    },
    {
        Header: "Telefono",
        accessor: "telefono",
    },
    {
        Header: "Apellido Jefe",
        accessor: "jefe.apellido",
    },
];

export const COLUMNS_CLIENTES = [
    {
        Header: "ID",
        accessor: "id",
    },
    {
        Header: "Nombre",
        accessor: "nombre",
    },
    {
        Header: "Telefono",
        accessor: "telefono",
    },
    {
        Header: "Direccion",
        accessor: "direccion",
    },
    {
        Header: "Ciudad",
        accessor: "ciudad",
    },
    {
        Header: "Estado",
        accessor: "estado",
    },
    {
        Header: "Pais",
        accessor: "pais",
    },
    {
        Header: "CP",
        accessor: "cod_postal",
    },
    {
        Header: "Calificacion Credito",
        accessor: "calificacion_CREDITO",
    },
    {
        Header: "Apellido de Vendedor",
        accessor: "vendedor.apellido",
    },
    {
        Header: "Nombre de Region",
        accessor: "region.nombre",
    },
    {
        Header: "Comentarios",
        accessor: "comentarios",
    },
];

export const COLUMNS_DEPARTAMENTOS = [
    {
        Header: "ID",
        accessor: "id",
    },
    {
        Header: "Nombre",
        accessor: "nombre",
    },
    {
        Header: "Region",
        accessor: "region.nombre",
    },
];

export const COLUMNS_EMPLEADOS = [
    {
        Header: "ID",
        accessor: "id",
    },
    {
        Header: "Nombre",
        accessor: "nombre",
    },
    {
        Header: "Apellido",
        accessor: "apellido",
    },
    {
        Header: "ID Usuario",
        accessor: "id_usuario",
    },
    {
        Header: "Fecha Ingreso",
        accessor: "fecha_ingreso",
    },
    {
        Header: "Comentarios",
        accessor: "comentarios",
    },
    {
        Header: "Apellido del jefe",
        accessor: "jefe.apellido",
    },
    {
        Header: "Depto",
        accessor: "depto.nombre",
    },
    {
        Header: "Salario",
        accessor: "salario",
    },
    {
        Header: "Comisión",
        accessor: "porcent_comission",
    },
];

export const COLUMNS_INVENTARIOS = [
    {
        Header: "ID Almacen",
        accessor: "idAlmacenes",
    },
    {
        Header: "Producto",
        accessor: "producto.nombre",
    },
    {
        Header: "Almacen",
        accessor: "almacen.direccion",
    },
    {
        Header: "Cantidad en Stock",
        accessor: "cantEnStock",
    },
    {
        Header: "Maximo en Stock",
        accessor: "maxEnStock",
    },
    {
        Header: "Fecha de Restock",
        accessor: "fechaDeRestock",
    },
    {
        Header: "ID Producto",
        accessor: "idProducto",
    },
];

export const COLUMNS_PRODUCTOS = [
    {
        Header: "ID",
        accessor: "id",
    },
    {
        Header: "Nombre",
        accessor: "nombre",
    },
    {
        Header: "Descripcion",
        accessor: "descripcion",
    },
    {
        Header: "Precio Sugerido",
        accessor: "precioSugerido",
    },
    {
        Header: "Unidades",
        accessor: "unidades",
    },
];

export const COLUMNS_REGIONES = [
    {
        Header: "ID",
        accessor: "id",
    },
    {
        Header: "Nombre",
        accessor: "nombre",
    },
];
