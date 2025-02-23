package utn.frc.backend.api_pruebas.services;

import utn.frc.backend.api_pruebas.models.Empleado;
import utn.frc.backend.api_pruebas.models.Interesado;
import utn.frc.backend.api_pruebas.models.Prueba;
import utn.frc.backend.api_pruebas.models.Vehiculo;
import utn.frc.backend.api_pruebas.repositories.EmpleadoRepository;
import utn.frc.backend.api_pruebas.repositories.InteresadoRepository;
import utn.frc.backend.api_pruebas.repositories.PruebaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import utn.frc.backend.api_pruebas.repositories.VehiculoRepository;

@Service
public class PruebaService {
    private final PruebaRepository repository;

    private final EmpleadoRepository empleadoRepository;
    private final VehiculoRepository vehiculoRepository;
    private final InteresadoRepository interesadoRepository;

    @Autowired
    public PruebaService(PruebaRepository repository, EmpleadoRepository empleadoRepository, VehiculoRepository vehiculoRepository, InteresadoRepository interesadoRepository) {
        this.repository = repository;
        this.empleadoRepository = empleadoRepository;
        this.vehiculoRepository = vehiculoRepository;
        this.interesadoRepository = interesadoRepository;
    }

    public Iterable<Prueba> getAll(){
        return repository.findAll();
    }

    public Prueba getById(int id) {
        return repository.findById(id).orElseThrow();
    }

    public Prueba create(Prueba prueba) {
        // Buscar o guardar el empleado
        Empleado empleado = empleadoRepository.findById(prueba.getEmpleado().getLegajo())
            .orElseGet(() -> empleadoRepository.save(prueba.getEmpleado()));
        prueba.setEmpleado(empleado);

        // Buscar o guardar el vehiculo
        Vehiculo vehiculo = vehiculoRepository.findById(prueba.getVehiculo().getId())
            .orElseGet(() -> vehiculoRepository.save(prueba.getVehiculo()));
        prueba.setVehiculo(vehiculo);

        // Buscar o guardar el interesado
        Interesado interesado = interesadoRepository.findById(prueba.getInteresado().getId())
            .orElseGet(() -> interesadoRepository.save(prueba.getInteresado()));
        prueba.setInteresado(interesado);

        // Guardar la prueba
        return repository.save(prueba);
    }

    public Prueba update(int id, Prueba pruebaDetails){
        Prueba prueba = getById(id);

        prueba.setComentarios(pruebaDetails.getComentarios());
        prueba.setEmpleado(pruebaDetails.getEmpleado());
        prueba.setVehiculo(pruebaDetails.getVehiculo());
        prueba.setInteresado(pruebaDetails.getInteresado());
        prueba.setFechaHoraFin(pruebaDetails.getFechaHoraFin());
        prueba.setFechaHoraInicio(pruebaDetails.getFechaHoraInicio());

        return repository.save(prueba);
    }

    public void delete(int id){
        repository.deleteById(id);
    }
}
