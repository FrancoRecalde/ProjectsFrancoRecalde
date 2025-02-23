package utn.frc.backend.api_notificaciones.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import utn.frc.backend.api_notificaciones.models.Notificacion;
import utn.frc.backend.api_notificaciones.repositories.NotificacionRepository;

@Service
public class NotificacionService {
    // Repositorio de notificaciones
    private final NotificacionRepository repository;

    @Autowired
    public NotificacionService(NotificacionRepository repository) {
        this.repository = repository;
    }

    public Iterable<Notificacion> getAll(){
        return repository.findAll();
    }

    public Notificacion getById(int id) {
        return repository.findById(id).orElseThrow();
    }

    public Notificacion create(Notificacion notificacion) {
        return repository.save(notificacion);
    }

    public Notificacion update(int id, Notificacion notificacionDetails){
        Notificacion notificacion = getById(id);

        notificacion.setDescripcion(notificacionDetails.getDescripcion());
        notificacion.setFecha(notificacionDetails.getFecha());

        return repository.save(notificacion);
    }

    public void delete(int id){
        repository.deleteById(id);
    }
}
