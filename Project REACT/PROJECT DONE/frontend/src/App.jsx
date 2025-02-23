import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Inicio } from "./components/Inicio";
import { Navbar } from "./components/Navbar";
import { Crear } from "./components/Crear";
import { InicioSesion } from "./components/InicioSesion";
import { Registro } from "./components/Registro";
import { Tablas } from "./components/Tablas";
import { CrearEmpleados } from "./components/Crear/CrearEmpleados";
import { CrearDepartamentos } from "./components/Crear/CrearDepartamentos";
import { CrearAlmacenes } from "./components/Crear/CrearAlmacenes";
import { CrearClientes } from "./components/Crear/CrearClientes";
import { CrearInventarios } from "./components/Crear/CrearInventarios";
import { CrearProductos } from "./components/Crear/CrearProductos";
import { CrearRegiones } from "./components/Crear/CrearRegiones";
import { TablaAlmacenes } from "./components/Tablas/TablaAlmacenes";
import { TablaClientes } from "./components/Tablas/TablaClientes";
import { TablaDepartamentos } from "./components/Tablas/TablaDepartamentos";
import { TablaEmpleados } from "./components/Tablas/TablaEmpleados";
import { TablaInventarios } from "./components/Tablas/TablaInventarios";
import { TablaProductos } from "./components/Tablas/TablaProductos";
import { TablaRegiones } from "./components/Tablas/TablaRegiones";

function App() {
    return (
        <main className="h-[110%] h-min-[fit-content] bg-gradient-to-br from-[#ff9bd5] to-[#0E86D4]">
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Inicio />} />
                    <Route path="/inicio-sesion" element={<InicioSesion />} />
                    <Route path="/registro" element={<Registro />} />
                    <Route path="/crear" element={<Crear />} />
                    <Route path="/tablas" element={<Tablas />} />
                    <Route
                        path="/tablas/empleados"
                        element={<TablaEmpleados />}
                    />
                    <Route
                        path="/tablas/clientes"
                        element={<TablaClientes />}
                    />
                    <Route
                        path="/tablas/almacenes"
                        element={<TablaAlmacenes />}
                    />
                    <Route
                        path="/tablas/departamentos"
                        element={<TablaDepartamentos />}
                    />
                    <Route
                        path="/tablas/inventarios"
                        element={<TablaInventarios />}
                    />
                    <Route
                        path="/tablas/productos"
                        element={<TablaProductos />}
                    />
                    <Route
                        path="/tablas/regiones"
                        element={<TablaRegiones />}
                    />
                    <Route
                        path="/crear/empleados"
                        element={<CrearEmpleados />}
                    />
                    <Route
                        path="/crear/departamentos"
                        element={<CrearDepartamentos />}
                    ></Route>
                    <Route
                        path="/crear/almacenes"
                        element={<CrearAlmacenes />}
                    ></Route>
                    <Route
                        path="/crear/clientes"
                        element={<CrearClientes />}
                    ></Route>
                    <Route
                        path="/crear/inventarios"
                        element={<CrearInventarios />}
                    ></Route>
                    <Route
                        path="/crear/productos"
                        element={<CrearProductos />}
                    ></Route>
                    <Route
                        path="/crear/regiones"
                        element={<CrearRegiones />}
                    ></Route>
                </Routes>
            </BrowserRouter>
        </main>
    );
}

export default App;
