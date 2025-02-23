package utn.frc.backend.api_notificaciones.dtos;

import lombok.Data;

@Data
public class NotificacionDto {
    private int id;
    private String descripcion;
    private String fecha;
    private int idPosicion;
    private int idPrueba;
    private int[] idsInteresados;
}
