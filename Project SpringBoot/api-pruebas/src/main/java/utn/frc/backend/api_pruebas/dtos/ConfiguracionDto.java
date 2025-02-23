package utn.frc.backend.api_pruebas.dtos;

import lombok.Data;

import java.util.List;

@Data
public class ConfiguracionDto {
    private CoordenadaDto coordenadasAgencia;
    private double radioAdmitidoKm;
    private List<ZonaRestringidaDto> zonasRestringidas;
}
