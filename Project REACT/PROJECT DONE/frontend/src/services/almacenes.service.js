import axios from "axios";

const api_almacenes_url = "http://localhost:3001/api/almacenes";

async function getAlmacenes() {
  const response = await axios.get(api_almacenes_url);
  console.log(response.data);
  return response.data;
}

async function postAlmacenes(almacen) {
  const data = {
    id_region: almacen.id_region,
    direccion: almacen.direccion,
    cod_postal: almacen.cod_postal,
    telefono: almacen.telefono,
    id_jefe: almacen.id_jefe
  };
  console.log("ALMACEN ENVIADO:", data);
  try {
    const res = await axios.post(api_almacenes_url, data);
    console.log("RESPUESTA:", res.data);
    return res.data;
  } catch (error) {
    console.error("ERROR ENVIANDO ALMACEN:", error);
    throw error;
  }
}

const getAlmacenesFiltradas = async (filtro) => {
  console.log(filtro)
  const params = {
    filter: filtro.direccion
  }
  console.log(params)

  const response = await axios.get(api_almacenes_url, { params });
  console.log(response)

  return response.data;

};


async function updateAlmacen(data) {
  const url = 'http://localhost:3001/api/almacenes/' + data.id;
  const almacen = {
    id_region: data.id_region,
    direccion: data.direccion,
    cod_postal: data.cod_postal,
    telefono: data.telefono,
    id_jefe: data.id_jefe
  };
  console.log('Actualizando almacen:', almacen);
  const res = await axios.put(url, almacen, {
    headers: {'Content-Type': 'application/json'}
  });
  console.log(url)
  return res.data;
}

async function deleteAlmacen(almacen) {
  const url = 'http://localhost:3001/api/almacenes/' + almacen.id;
  try {
      await axios.delete(url);
  }
  catch (error) {
      console.error(error);
  }
}

export default { getAlmacenes, postAlmacenes, updateAlmacen, getAlmacenesFiltradas, deleteAlmacen };