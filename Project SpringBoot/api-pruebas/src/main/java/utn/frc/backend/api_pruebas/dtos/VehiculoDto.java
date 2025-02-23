package utn.frc.backend.api_pruebas.dtos;

import lombok.Data;

@Data
public class VehiculoDto {
    private int id;
    private ModeloDto modelo;
    private String patente;
}
