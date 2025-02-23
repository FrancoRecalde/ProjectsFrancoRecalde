package utn.frc.backend.api_notificaciones.repositories;

import org.springframework.data.repository.CrudRepository;
import utn.frc.backend.api_notificaciones.models.Notificacion;

public interface NotificacionRepository extends CrudRepository<Notificacion, Integer> {
}
