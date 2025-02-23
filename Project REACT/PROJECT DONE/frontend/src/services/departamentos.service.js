import axios from "axios";

const api_deptos_url = "http://localhost:3001/api/deptos";

async function getDeptos() {
  const response = await axios.get(api_deptos_url);
  console.log(response.data);
  return response.data;
}

async function postDeptos(depto) {
  const data = {
    nombre: depto.nombre,
    idRegion: depto.idRegion
  };
  console.log("DEPTO ENVIADO:", data);
  try {
    const res = await axios.post(api_deptos_url, data);
    console.log("RESPUESTA:", res.data);
    return res.data;
  } catch (error) {
    console.error("ERROR ENVIANDO DEPTO:", error);
    throw error;
  }
}

const getDeptosFiltradas = async (filtro) => {
  console.log(filtro)
  const params = {
    filter: filtro.nombre
  }
  console.log(params)

  const response = await axios.get(api_deptos_url, { params });
  console.log(response)

  return response.data;

};


async function updatDepto(data) {
  const url = 'http://localhost:3001/api/deptos/' + data.id;
  const deptos = {
    nombre: data.nombre,
    idRegion: data.idRegion
  };
  console.log('Actualizando depto:', deptos);
  const res = await axios.put(url, deptos, {
    headers: {'Content-Type': 'application/json'}
  });
  console.log(url)
  return res.data;
}

async function deleteDepto(depto) {
  const url = 'http://localhost:3001/api/deptos/' + depto.id;
  try {
      await axios.delete(url);
  }
  catch (error) {
      console.error(error);
  }
}

export default { getDeptos, postDeptos, updatDepto, getDeptosFiltradas, deleteDepto };