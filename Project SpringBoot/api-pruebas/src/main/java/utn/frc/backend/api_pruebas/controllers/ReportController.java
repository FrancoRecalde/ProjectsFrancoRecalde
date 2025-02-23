package utn.frc.backend.api_pruebas.controllers;


import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import utn.frc.backend.api_pruebas.dtos.PruebaDto;
import utn.frc.backend.api_pruebas.models.Posicion;
import utn.frc.backend.api_pruebas.models.Prueba;
import utn.frc.backend.api_pruebas.repositories.VehiculoRepository;
import utn.frc.backend.api_pruebas.services.NotificacionService;
import utn.frc.backend.api_pruebas.services.PosicionesService;
import utn.frc.backend.api_pruebas.services.PruebaService;


import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicReference;

@RestController
@RequestMapping("/api/reportes")
public class ReportController {
    // Servicio de pruebas
    @Autowired
    private  PruebaService service;
    // Servicio de notificaciones
    @Autowired
    private NotificacionService notiService;
    // Servicio de posiciones
    @Autowired
    private PosicionesService posicionesService;

    // ModelMapper, para mappear los DTOs a los modelos y viceversa
    @Autowired
    private ModelMapper mapper;

    /**
     * Reporte de incidentes
     * @return ResponseEntity con la lista de pruebas que contienen incidentes
     */
    @GetMapping("/incidentes")
    public ResponseEntity<Object> reportesIncidentes(){
        List<PruebaDto> pruebaDtoList = new ArrayList<>();
        // Se recorren todas las notificaciones
        notiService.getAll().forEach(noti->{
            // Si la notificacion tiene una prueba, se agrega a la lista
            if(noti.getPrueba() != null)
                pruebaDtoList.add(mapper.map(noti.getPrueba(),PruebaDto.class));
        });

        // Si no hay pruebas con incidentes, se retorna un bad request
        if(pruebaDtoList.isEmpty())
            return ResponseEntity.badRequest().body("no se encontraron pruebas que esten fuera de los limites");

        // Se retorna la lista de pruebas
        return ResponseEntity.ok(pruebaDtoList);
    }

    /**
     * Reporte de pruebas de un empleado
     * @param legajo Legajo del empleado
     * @return ResponseEntity con la lista de pruebas del empleado
     */
    @GetMapping("/empleado/{legajo}")
    public ResponseEntity<Object> reportesEmpleado(@PathVariable("legajo") int legajo){
        List<PruebaDto> pruebaDtoList = new ArrayList<>();
        // Se recorren todas las notificaciones
        notiService.getAll().forEach(noti->{
            // Si la notificacion tiene una prueba y el empleado coincide con el legajo, se agrega a la lista
            if(noti.getPrueba() != null && noti.getPrueba().getEmpleado().getLegajo() == legajo )
                pruebaDtoList.add(mapper.map(noti.getPrueba(),PruebaDto.class));
        });

        // Si no hay pruebas con incidentes, se retorna un bad request
        if(pruebaDtoList.isEmpty())
            return ResponseEntity.badRequest().body("no se encontraron pruebas con incidentes para este empleado");

        // Se retorna la lista de pruebas
        return ResponseEntity.ok(pruebaDtoList);
    }

    /**
     * Reporte de kilometros recorridos en una prueba
     * @param id_prueba id de la prueba
     * @param fecha_inicio fecha de inicio
     * @param fecha_fin fecha de fin
     * @return ResponseEntity con la distancia recorrida
     */
    @GetMapping("/kilometros/{id_prueba}")
    public ResponseEntity<Object> reportesKilometros(@PathVariable("id_prueba") int id_prueba,
                                                     @RequestParam(value = "fecha_inicio") String fecha_inicio,
                                                     @RequestParam(value = "fecha_fin")  String fecha_fin){
        AtomicReference<Double> distancia = new AtomicReference<>((double) 0);
        final Posicion[] ultima = {null};
        Prueba prueba = service.getById(id_prueba);

        // Si la prueba no existe o no tiene posiciones, se retorna un bad request
        if (prueba  == null || prueba.getVehiculo().getPosiciones().isEmpty())
            return ResponseEntity.badRequest().body("la prueba no existe o no contiene posiciones");

        // Se recorren las posiciones de la prueba
        prueba.getVehiculo().getPosiciones().stream().filter(pos->
                // Se valida que la posicion este dentro del periodo
            pos.validarPeriodo(LocalDate.parse(fecha_inicio,DateTimeFormatter.ofPattern("dd-MM-yyyy")),
                    LocalDate.parse(fecha_fin, DateTimeFormatter.ofPattern("dd-MM-yyyy")) )
        ).forEach(pos->{
            // Se calcula la distancia entre la posicion actual y la anterior
            if(ultima[0] == null)
                ultima[0] = pos;
            distancia.updateAndGet(v -> (v + posicionesService.calcularDistancia(ultima[0].getLatitud(), ultima[0].getLongitud(),
                    pos.getLatitud(), pos.getLongitud())));
            ultima[0] = pos;
        });

        // Se retorna la distancia recorrida
        return ResponseEntity.ok("la distancia recorrida en la prueba es: " + distancia.get() + "km");
    }

    /**
     * Reporte de pruebas de un vehiculo
     * @param id id del vehiculo
     * @return ResponseEntity con la lista de pruebas del vehiculo
     */
    @GetMapping("/pruebas/{id}")
    public ResponseEntity<Object> reportesPruebas(@PathVariable("id") int id){
        List<PruebaDto> pruebaList = new ArrayList<>();
        Iterable<Prueba> iterableP = service.getAll();

        // Se recorren todas las pruebas
        iterableP.forEach(prueba -> {
            if(prueba.getVehiculo().getId() == id){
                pruebaList.add(mapper.map(prueba, PruebaDto.class));
            }
        });

        // Si no hay pruebas con incidentes, se retorna un bad request
        if(pruebaList.isEmpty())
            return ResponseEntity.badRequest().body("no se encontraron pruebas para ese vehiculo");

        // Se retorna la lista de pruebas
        return ResponseEntity.ok(pruebaList);
    }
}
