import axios from "axios";

const api_productos_url = "http://localhost:3001/api/productos";

async function getProductos() {
  const response = await axios.get(api_productos_url);
  console.log(response.data);
  return response.data;
}

async function postProductos(producto) {
  const data = {
    nombre: producto.nombre,
    descripcion:  producto.descripcion,
    precioSugerido:  producto.precioSugerido,
    unidades:  producto.unidades,
  };
  console.log("PRODUCTO ENVIADO:", data);
  try {
    const res = await axios.post(api_productos_url, data);
    console.log("RESPUESTA:", res.data);
    return res.data;
  } catch (error) {
    console.error("ERROR ENVIANDO PRODUCTO:", error);
    throw error;
  }
}
const getProductosFiltradas = async (filtro) => {
  const params = {
    filter: filtro.nombre
  }
  console.log(params)

  const response = await axios.get(api_productos_url, { params });
  return response.data;

};

async function updateProducto(data) {
  const url = 'http://localhost:3001/api/productos/' + data.id;
  const producto = {
    nombre: data.nombre,
    descripcion:  data.descripcion,
    precioSugerido:  data.precioSugerido,
    unidades:  data.unidades,
  };
  console.log('Actualizando producto:', producto);
  const res = await axios.put(url, producto, {
    headers: { 'Content-Type': 'application/json' }
  });
  return res.data;
}

async function deleteProducto(producto) {
  const url = 'http://localhost:3001/api/productos/' + producto.id;
  try {
      await axios.delete(url);
  }
  catch (error) {
      console.error(error);
  }
}

export default { getProductos, postProductos, getProductosFiltradas, updateProducto, deleteProducto };