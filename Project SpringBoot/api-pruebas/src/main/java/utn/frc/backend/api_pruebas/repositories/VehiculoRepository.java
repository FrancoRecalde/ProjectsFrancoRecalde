package utn.frc.backend.api_pruebas.repositories;

import org.springframework.data.repository.CrudRepository;
import utn.frc.backend.api_pruebas.models.Vehiculo;

public interface VehiculoRepository extends CrudRepository<Vehiculo, Integer> {
}
