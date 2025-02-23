package utn.frc.backend.api_notificaciones.repositories;

import org.springframework.data.repository.CrudRepository;
import utn.frc.backend.api_notificaciones.models.Interesado;

public interface InteresadoRepository extends CrudRepository<Interesado, Integer> {
}
