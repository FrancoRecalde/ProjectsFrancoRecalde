package utn.frc.backend.api_pruebas.controllers;

import org.modelmapper.ModelMapper;
import utn.frc.backend.api_pruebas.dtos.PruebaDto;
import utn.frc.backend.api_pruebas.models.*;
import utn.frc.backend.api_pruebas.services.PruebaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicBoolean;

@RestController
@RequestMapping("/api/pruebas")
public class PruebaController {

    // Servicio de pruebas
    @Autowired
    private PruebaService service;

    // ModelMapper, para mappear los DTOs a los modelos y viceversa
    @Autowired
    private ModelMapper modelMapper;

    // Formateador de fechas
    private DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");

    /**
     * Agrega una nueva prueba
     * @param pruebaDto DTO de la prueba
     * @return ResponseEntity con la prueba creada
     */
    @PostMapping
    public ResponseEntity<Object> add(@RequestBody PruebaDto pruebaDto) {
        // Setea la fecha de inicio como la fecha actual
        pruebaDto.setFechaHoraInicio(LocalDate.now().format(formatter));
        Prueba prueba = modelMapper.map(pruebaDto, Prueba.class); // Mapea el DTO a un modelo
        
        // Verifica si la licencia está vencida
        LocalDate fechaVencimiento;
        try{
            fechaVencimiento = LocalDate.parse(prueba.getInteresado().getFechaVencimientoLicencia(), formatter);
        }catch (DateTimeParseException e){
            return ResponseEntity.badRequest().body("Formato de fecha inválido. Debe ser 'dd-MM-yyyy'.");
        }

        // Verifica si la fecha de vencimiento es anterior a la fecha actual
        if (fechaVencimiento.isBefore(LocalDate.now())) {
            return ResponseEntity.badRequest().body("Licencia del interesado vencida");
        }

        // Verifica si el interesado está restringido
        if (prueba.getInteresado().getRestringido())
            return ResponseEntity.badRequest().body("El interesado está restringido");

        // Verifica si el vehículo está siendo probado
        AtomicBoolean probado = new AtomicBoolean(false);
        service.getAll().forEach(p -> {
            if (p.getVehiculo().getId() == prueba.getVehiculo().getId() && p.getActivo()) {
                probado.set(true);
            }
        });
        if (probado.get())
            return ResponseEntity.badRequest().body("El vehiculo está siendo probado en este momento");

        // Devuelve la prueba creada
        return ResponseEntity.ok(modelMapper.map(service.create(prueba), PruebaDto.class));
    }

    /**
     * Obtiene todas las pruebas que se encuentran activas en un momento dado
     * @param momento Momento en el que se quiere obtener las pruebas
     * @return ResponseEntity con las pruebas activas en el momento indicado
     */
    @GetMapping
    public ResponseEntity<Object> getByMoment(@RequestParam(value = "momento", required = false) String momento) {
        // Obtiene el momento actual si no se especifica
        LocalDate finalMomento;
        try {
            finalMomento = (momento == null) ? LocalDate.now() : LocalDate.parse(momento, formatter);
        } catch (DateTimeParseException e) {
            // Devuelve un error si el formato de fecha es inválido
            return ResponseEntity.badRequest().body("Formato de fecha inválido. Debe ser 'dd-MM-yyyy'.");
        }

        List<Prueba> pruebas = new ArrayList<>();
        // Filtra las pruebas activas en el momento indicado
        service.getAll().forEach(p -> {
            if (p.getActivo(finalMomento)) {
                pruebas.add(p);
            }
        });

        // Devuelve un error si no se encontraron pruebas
        if (pruebas.isEmpty())
            return ResponseEntity.badRequest().body("No se encontraron pruebas en el momento indicado (" + finalMomento.format(formatter) + ")");

        // Devuelve las pruebas encontradas
        return ResponseEntity.ok(pruebas.stream()
                .map(p -> modelMapper.map(p, PruebaDto.class))
                .toList());
    }

    /**
     * Finaliza una prueba
     * @param pruebaDto DTO de la prueba
     * @return ResponseEntity con la prueba finalizada
     */
    @PutMapping
    public ResponseEntity<Object> finalizarPrueba(@RequestBody PruebaDto pruebaDto) {
        // Obtiene la prueba por ID
        Prueba prueba = service.getById(pruebaDto.getId());

        // Setea la fecha de fin como la fecha actual
        prueba.setFechaHoraFin(LocalDate.now().format(formatter));
        // Setea los comentarios
        prueba.setComentarios(pruebaDto.getComentarios());

        // Retorna la prueba finalizada
        return ResponseEntity.ok(modelMapper.map(service.update(prueba.getId(), prueba), PruebaDto.class));
    }

    /**
     * Obtiene todas las pruebas activas
     * @return ResponseEntity con las pruebas activas
     */
    @GetMapping("/activas")
    public ResponseEntity<Object> getActivas() {
        List<Prueba> pruebas = new ArrayList<>();

        // Filtra las pruebas activas
        service.getAll().forEach(p -> {
            if (p.getActivo()) {
                pruebas.add(p);
            }
        });

        // Devuelve un error si no se encontraron pruebas activas
        if (pruebas.isEmpty())
            return ResponseEntity.badRequest().body("No se encontraron pruebas activas");

        // Devuelve las pruebas activas
        return ResponseEntity.ok(pruebas.stream()
                .map(p -> modelMapper.map(p, PruebaDto.class))
                .toList());
    }
}