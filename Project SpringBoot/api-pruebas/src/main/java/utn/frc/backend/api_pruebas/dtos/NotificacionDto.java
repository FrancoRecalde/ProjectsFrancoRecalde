package utn.frc.backend.api_pruebas.dtos;

import lombok.Data;

@Data
public class NotificacionDto {
    private int id;
    private String descripcion;
    private int idPosicion;
    private int idPrueba;
}
