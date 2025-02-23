package utn.frc.backend.api_pruebas.repositories;

import org.springframework.data.repository.CrudRepository;
import utn.frc.backend.api_pruebas.models.Notificacion;

public interface NotificacionRepository extends CrudRepository<Notificacion, Integer> {
}
