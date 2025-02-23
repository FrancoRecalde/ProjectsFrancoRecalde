package utn.frc.backend.api_pruebas.dtos;

import lombok.Data;

@Data
public class ModeloDto {
    private int id;
    private String descripcion;
    private MarcaDto marca;
}
