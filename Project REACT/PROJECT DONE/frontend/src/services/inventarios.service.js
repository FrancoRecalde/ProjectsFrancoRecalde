import axios from "axios";

const api_inventarios_url = "http://localhost:3001/api/inventarios";

async function getInventarios() {
  const response = await axios.get(api_inventarios_url);
  console.log(response.data);
  return response.data;
}

const getInventariosFiltradas = async (filtro) => {
  const params = {
    filter: filtro.almacenId
  }
  console.log(params)

  const response = await axios.get(api_inventarios_url, { params });
  return response.data;

};

async function postInventarios(inventario) {
  const data = {
    idProducto: inventario.idProducto,
    idAlmacenes: inventario.idAlmacenes,
    cantEnStock: inventario.cantEnStock,
    maxEnStock: inventario.maxEnStock,
    fechaDeRestock: inventario.fechaDeRestock
  };
  console.log("INVENTARIO ENVIADO:", data);
  try {
    const res = await axios.post(api_inventarios_url, data);
    console.log("RESPUESTA:", res.data);
    return res.data;
  } catch (error) {
    console.error("ERROR ENVIANDO INVENTARIO:", error);
    throw error;
  }
}

async function updateInventario(data) {
  const url = 'http://localhost:3001/api/inventarios/' + data.idProducto + '/' + data.idAlmacenes;
  const inventario = {
    cantEnStock: data.cantEnStock,
    maxEnStock: data.maxEnStock,
    fechaDeRestock: data.fechaDeRestock
  };
  console.log('Actualizando inventario:', inventario);
  const res = await axios.put(url, inventario, {
    headers: { 'Content-Type': 'application/json' }
  });
  return res.data;
}

async function deleteInventario(inventario) {
  const url = 'http://localhost:3001/api/inventarios/' + inventario.idProducto + '/' + inventario.idAlmacenes;
  try {
      await axios.delete(url);
  }
  catch (error) {
      console.error(error);
  }
}

export default { getInventarios, getInventariosFiltradas, updateInventario, deleteInventario, postInventarios };