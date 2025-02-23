package utn.frc.backend.api_notificaciones.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import utn.frc.backend.api_notificaciones.dtos.NotificacionDto;
import utn.frc.backend.api_notificaciones.models.Interesado;
import utn.frc.backend.api_notificaciones.models.Notificacion;
import utn.frc.backend.api_notificaciones.repositories.InteresadoRepository;
import utn.frc.backend.api_notificaciones.repositories.PosicionRepository;
import utn.frc.backend.api_notificaciones.repositories.PruebaRepository;
import utn.frc.backend.api_notificaciones.services.NotificacionService;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@RestController
@RequestMapping("/api/notificaciones")
public class NotificacionController {

    // Servicio de notificaciones
    @Autowired
    private NotificacionService service;

    // Repositorios de Interesado, Posicion y Prueba
    @Autowired
    private InteresadoRepository interesadoRepository;
    @Autowired
    private PosicionRepository posicionRepository;
    @Autowired
    private PruebaRepository pruebaRepository;

    // ModelMapper, para mappear los DTOs a los modelos y viceversa
    @Autowired
    private ModelMapper modelMapper;

    // Formateador de fechas
    private DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");

    /**
     * Obtiene todas las notificaciones
     * @return ResponseEntity con la lista de notificaciones
     */
    @GetMapping
    public ResponseEntity<Object> getAll() {
        Iterator<Notificacion> iterator = service.getAll().iterator();

        List<NotificacionDto> notificaciones = new ArrayList<NotificacionDto>();
        // Mapea las notificaciones a DTOs
        while(iterator.hasNext()){
            Notificacion notificacion = iterator.next();
            NotificacionDto notificacionDto = new NotificacionDto();
            notificacionDto.setId(notificacion.getId());
            notificacionDto.setDescripcion(notificacion.getDescripcion());
            notificacionDto.setFecha(notificacion.getFecha().format(formatter));
            notificacionDto.setIdPosicion(notificacion.getPosicion() != null ? notificacion.getPosicion().getId() : 0);
            notificacionDto.setIdPrueba(notificacion.getPrueba() != null ? notificacion.getPrueba().getId() : 0);

            // Mapea los interesados a un array de ids
            if (notificacion.getInteresados().isEmpty())
                notificacionDto.setIdsInteresados(new int[0]);
            else
                notificacionDto.setIdsInteresados(notificacion.getInteresados().stream().mapToInt(Interesado::getId).toArray());

            notificaciones.add(notificacionDto);
        }

        // Retorna la lista de notificaciones
        return ResponseEntity.ok(notificaciones);
    }

    /**
     * Agrega una nueva notificación de promoción
     * @param notificacionDto DTO de la notificación
     * @return ResponseEntity con la notificación creada
     */
    @PostMapping("/promocion")
    public ResponseEntity<Object> addPromocion(@RequestBody NotificacionDto notificacionDto) {
        Notificacion notificacion = modelMapper.map(notificacionDto, Notificacion.class);

        // Agrega interesados solo si están presentes
        for (int id_interesado : notificacionDto.getIdsInteresados()) {
            Interesado interesado = interesadoRepository.findById(id_interesado).orElse(null);
            if (interesado != null) {
                notificacion.getInteresados().add(interesado);
            }
        }

        // Verificación de interesados vacíos
        if (notificacion.getInteresados().isEmpty()) {
            return ResponseEntity.badRequest().body("No se encontraron interesados con los ids proporcionados");
        }

        // Asigna la fecha actual y asegura que Prueba y Posicion estén en null para este tipo de notificación
        notificacion.setFecha(LocalDate.now());
        notificacion.setPrueba(null); // para evitar la excepción
        notificacion.setPosicion(null); // para evitar la excepción

        return ResponseEntity.ok(modelMapper.map(service.create(notificacion), NotificacionDto.class));
    }

    /**
     * Agrega una nueva notificación de zona inválida
     * @param notificacionDto DTO de la notificación
     * @return ResponseEntity con la notificación creada
     */
    @PostMapping("/zona-invalida")
    public ResponseEntity<Object> addZonaInvalida(@RequestBody NotificacionDto notificacionDto) {
        // Mapea el DTO a un modelo
        Notificacion notificacion = modelMapper.map(notificacionDto, Notificacion.class);
        notificacion.setFecha(LocalDate.now()); // Setea la fecha actual

        // Verifica si la posición existe
        notificacion.setPosicion(posicionRepository.findById(notificacionDto.getIdPosicion()).orElse(null));
        if (notificacion.getPosicion() == null)
            return ResponseEntity.badRequest().body("No se encontró la posición con el id proporcionado");
        // Verifica si la prueba existe
        notificacion.setPrueba(pruebaRepository.findById(notificacionDto.getIdPrueba()).orElse(null));
        if (notificacion.getPrueba() == null)
            return ResponseEntity.badRequest().body("No se encontró la prueba con el id proporcionado");

        // Agrega interesados solo si están presentes
        return ResponseEntity.ok(modelMapper.map(service.create(notificacion), NotificacionDto.class));
    }
}
