package utn.frc.backend.api_pruebas.dtos;

import lombok.Data;

@Data
public class PosicionDto {
    private int id;
    private String fechaHora;
    private double latitud;
    private double longitud;
    private int idVehiculo;
}
