package utn.frc.backend.api_pruebas.repositories;

import org.springframework.data.repository.CrudRepository;
import utn.frc.backend.api_pruebas.models.Empleado;

public interface EmpleadoRepository extends CrudRepository<Empleado, Integer> {
}
