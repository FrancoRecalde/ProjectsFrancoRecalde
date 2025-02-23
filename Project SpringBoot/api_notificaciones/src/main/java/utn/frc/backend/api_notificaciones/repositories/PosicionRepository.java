package utn.frc.backend.api_notificaciones.repositories;

import org.springframework.data.repository.CrudRepository;
import utn.frc.backend.api_notificaciones.models.Posicion;

public interface PosicionRepository extends CrudRepository<Posicion, Integer> {
}
