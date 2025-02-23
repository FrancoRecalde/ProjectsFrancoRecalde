package utn.frc.backend.api_notificaciones.repositories;

import org.springframework.data.repository.CrudRepository;
import utn.frc.backend.api_notificaciones.models.Prueba;

public interface PruebaRepository extends CrudRepository<Prueba, Integer> {
}
