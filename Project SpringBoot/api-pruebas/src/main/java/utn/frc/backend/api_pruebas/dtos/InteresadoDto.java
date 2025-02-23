package utn.frc.backend.api_pruebas.dtos;

import lombok.Data;

@Data
public class InteresadoDto {
    private int id;
    private String tipoDocumento;
    private String documento;
    private String nombre;
    private String apellido;
    private String fechaVencimientoLicencia;
    private int nroLicencia;
    private boolean restringido;
}
