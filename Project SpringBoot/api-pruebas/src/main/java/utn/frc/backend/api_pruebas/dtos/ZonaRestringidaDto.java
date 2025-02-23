package utn.frc.backend.api_pruebas.dtos;

import lombok.Data;

@Data
public class ZonaRestringidaDto {
    private CoordenadaDto noroeste;
    private CoordenadaDto sureste;
}
