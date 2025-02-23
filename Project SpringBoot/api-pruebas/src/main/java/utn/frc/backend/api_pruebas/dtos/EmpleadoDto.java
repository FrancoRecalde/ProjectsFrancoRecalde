package utn.frc.backend.api_pruebas.dtos;

import lombok.Data;

@Data
public class EmpleadoDto {
    private int legajo;
    private String nombre;
    private String apellido;
    private long telefonoContacto;
}
