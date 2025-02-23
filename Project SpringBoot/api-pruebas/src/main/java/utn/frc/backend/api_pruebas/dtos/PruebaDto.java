package utn.frc.backend.api_pruebas.dtos;

import lombok.Data;

@Data
public class PruebaDto {
    private int id;
    private String fechaHoraInicio;
    private String fechaHoraFin;
    private String comentarios;
    private EmpleadoDto empleado;
    private InteresadoDto interesado;
    private VehiculoDto vehiculo;
}
