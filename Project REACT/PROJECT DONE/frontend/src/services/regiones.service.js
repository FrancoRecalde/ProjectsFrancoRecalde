import axios from "axios";

const api_regiones_url = "http://localhost:3001/api/regiones";

async function getRegiones() {
  const response = await axios.get(api_regiones_url);
  console.log(response.data);
  return response.data;
}

async function postRegiones(region) {
  const data = {
    nombre: region.nombre,
  };
  console.log("REGION ENVIADA:", data);
  try {
    const res = await axios.post(api_regiones_url, data);
    console.log("RESPUESTA:", res.data);
    return res.data;
  } catch (error) {
    console.error("ERROR ENVIANDO REGIÓN:", error);
    throw error;
  }
}

const getRegionesFiltradas = async (filtro) => {
  const params = {
    filter: filtro.nombre
  }
  console.log(params)

  const response = await axios.get(api_regiones_url, { params });
  return response.data;

};



async function updateRegion(data) {
  const url = 'http://localhost:3001/api/regiones/' + data.id;
  const region = {
    nombre: data.nombre
  };
  console.log('Actualizando region:', region);
  const res = await axios.put(url, region, {
    headers: {'Content-Type': 'application/json'}
  });
  console.log(url)
  return res.data;
}

async function deleteRegion(region) {
  const url = 'http://localhost:3001/api/regiones/' + region.id;
  try {
      await axios.delete(url);
  }
  catch (error) {
      console.error(error);
  }
}

export default { getRegiones, postRegiones, updateRegion, getRegionesFiltradas, deleteRegion };
