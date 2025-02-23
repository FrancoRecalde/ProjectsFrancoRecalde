package utn.frc.backend.api_pruebas.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import utn.frc.backend.api_pruebas.dtos.NotificacionDto;
import utn.frc.backend.api_pruebas.dtos.PosicionDto;
import utn.frc.backend.api_pruebas.models.Posicion;
import utn.frc.backend.api_pruebas.models.Prueba;
import utn.frc.backend.api_pruebas.repositories.VehiculoRepository;
import utn.frc.backend.api_pruebas.services.NotificacionApiService;
import utn.frc.backend.api_pruebas.services.PosicionesService;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@RestController
@RequestMapping("/api/posiciones")
public class PosicionController {

    // Servicio de posiciones
    @Autowired
    private PosicionesService service;
    // Servicio de notificaciones
    @Autowired
    private NotificacionApiService notificacionApiService;

    // Repositorio de vehículos
    @Autowired
    private VehiculoRepository vehiculoRepository;

    // ModelMapper, para mappear los DTOs a los modelos y viceversa
    @Autowired
    private ModelMapper modelMapper;

    // Formateador de fechas
    private DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");

    /**
     * Agrega una nueva posición
     * @param posicionDto DTO de la posición
     * @return ResponseEntity con la posición creada
     */
    @PostMapping
    public ResponseEntity<Object> add(@RequestBody PosicionDto posicionDto) {
        // Mapea el DTO a un modelo
        Posicion posicion = modelMapper.map(posicionDto, Posicion.class);
        posicion.setFechaHora(LocalDate.now().format(formatter)); // Setea la fecha de la posición como la fecha actual

        // Verifica si el vehiculo tiene alguna prueba activa
        if (vehiculoRepository.findById(posicionDto.getIdVehiculo()).get().getPruebas().stream().noneMatch(Prueba::getActivo))
            return ResponseEntity.badRequest().body("El vehículo no tiene ninguna prueba activa");

        // Crea la posición
        try {
            posicion = service.create(posicion);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }

        // Verifica si la posición es válida
        try {
            System.out.println("Posicion valida: " + service.isPositionValid(posicion));
            // Validar la posición
            if (!service.isPositionValid(posicion)) {
                // Si no es valida, crea una notificación y la envía
                NotificacionDto notificacionDto = new NotificacionDto();
                notificacionDto.setDescripcion("Posición fuera del área permitida o en zona restringida.");
                notificacionDto.setIdPosicion(posicion.getId());
                notificacionDto.setIdPrueba(posicion.getVehiculo().getPruebas().stream().filter(Prueba::getActivo).findFirst().get().getId());

                // Enviar notificación
                notificacionApiService.postNotificacionZonaInvalida(notificacionDto);

                return ResponseEntity.badRequest().body("Posición fuera del área permitida o en zona restringida.");
            }
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.badRequest().body(e.getMessage());
        }

        // Devuelve la posición creada
        return ResponseEntity.ok(modelMapper.map(posicion, PosicionDto.class));
    }
}
