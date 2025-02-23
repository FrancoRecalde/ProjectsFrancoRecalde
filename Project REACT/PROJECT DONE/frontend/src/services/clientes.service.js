import axios from "axios";

const api_clientes_url = "http://localhost:3001/api/clientes";

async function getClientes() {
  const response = await axios.get(api_clientes_url);
  console.log(response.data);
  return response.data;
}

async function postClientes(cliente) {
  const data = {
    nombre: cliente.nombre,
    telefono: cliente.telefono,
    direccion: cliente.direccion,
    ciudad: cliente.ciudad,
    estado: cliente.estado,
    pais: cliente.pais,
    cod_postal: cliente.cod_postal,
    calificacion_CREDITO: cliente.calificacion_CREDITO,
    id_vendedor: cliente.id_vendedor,
    id_region: cliente.id_region,
    comentarios: cliente.comentarios
  };
  console.log("CLIENTE ENVIADO:", data);
  try {
    const res = await axios.post(api_clientes_url, data);
    console.log("RESPUESTA:", res.data);
    return res.data;
  } catch (error) {
    console.error("ERROR ENVIANDO CLIENTE:", error);
    throw error;
  }
}


const getClientesFiltradas = async (filtro) => {
  const params = {
    filter: filtro.nombre
  }
  console.log(params)

  const response = await axios.get(api_clientes_url, { params });
  return response.data;

};


async function updateCliente(data) {
  const url = 'http://localhost:3001/api/clientes/' + data.id;
  const cliente = {
    nombre: data.nombre,
    telefono: data.telefono,
    direccion: data.direccion,
    ciudad: data.ciudad,
    estado: data.estado,
    pais: data.pais,
    cod_postal: data.cod_postal,
    calificacion_CREDITO: data.calificacion_CREDITO,
    id_vendedor: data.id_vendedor,
    id_region: data.id_region,
    comentarios: data.comentarios
  };
  console.log('Actualizando cliente:', cliente);
  const res = await axios.put(url, cliente, {
    headers: { 'Content-Type': 'application/json' }
  });
  return res.data;
}

async function deleteCliente(cliente) {
  const url = 'http://localhost:3001/api/clientes/' + cliente.id;
  try {
      await axios.delete(url);
  }
  catch (error) {
      console.error(error);
  }
}

export default { getClientes, postClientes, updateCliente, getClientesFiltradas, deleteCliente };