package utn.frc.backend.api_pruebas.repositories;

import org.springframework.data.repository.CrudRepository;
import utn.frc.backend.api_pruebas.models.Posicion;

public interface PosicionRepository extends CrudRepository<Posicion, Integer> {
}
