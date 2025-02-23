import axios from "axios";

const api_empleados_url = "http://localhost:3001/api/empleados";

async function getEmpleados() {
  const response = await axios.get(api_empleados_url);
  console.log(response.data);
  return response.data;
}

async function postEmpleados(empleado) {
  const data = {
    nombre: empleado.nombre,
    apellido: empleado.apellido,
    id_usuario: empleado.id_usuario,
    fecha_ingreso: empleado.fecha_ingreso,
    comentarios: empleado.comentarios,
    id_jefe: empleado.id_jefe,
    depto_id: empleado.depto_id,
    salario: empleado.salario,
    porcent_comission: empleado.porcent_comission

  };
  console.log("EMPLEADO ENVIADO:", data);
  try {
    const res = await axios.post(api_empleados_url, data);
    console.log("RESPUESTA:", res.data);
    return res.data;
  } catch (error) {
    console.error("ERROR ENVIANDO EMPLEADO:", error);
    throw error;
  }
}

const getEmpleadosFiltradas = async (filtro) => {
  console.log(filtro)
  const params = {
    filter: filtro.nombre
  }
  console.log('PARAMS:', params)

  const response = await axios.get(api_empleados_url, { params });
  console.log('RES', response)

  return response.data;
}


async function updateEmpleado(data) {
  const url = 'http://localhost:3001/api/empleados/' + data.id;
  const fecha = data.fecha_ingreso.split(' ')[0];
  const empleado = {
    nombre: data.nombre,
    apellido: data.apellido,
    id_usuario: data.id_usuario,
    fecha_ingreso: fecha,
    comentarios: data.comentarios,
    id_jefe: data.id_jefe,
    depto_id: data.depto_id,
    salario: data.salario,
    porcent_comission: data.porcent_comission
  };
  console.log('Actualizando empleado:', empleado);
  const res = await axios.put(url, empleado, {
    headers: { 'Content-Type': 'application/json' }
  });
  return res.data;
}

async function deleteEmpleado(empleado) {
  const url = 'http://localhost:3001/api/empleados/' + empleado.id;
  try {
      await axios.delete(url);
  }
  catch (error) {
      console.error(error);
  }
}

export default { getEmpleados, postEmpleados, updateEmpleado, getEmpleadosFiltradas, deleteEmpleado };
