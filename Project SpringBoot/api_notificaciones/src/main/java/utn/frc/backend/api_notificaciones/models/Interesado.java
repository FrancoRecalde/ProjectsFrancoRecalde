package utn.frc.backend.api_notificaciones.models;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "interesados")
public class Interesado {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "tipo_documento")
    private String tipoDocumento;

    private String documento;

    private String nombre;

    private String apellido;

    private boolean restringido;

    @Column(name = "nro_licencia")
    private int nroLicencia;

    @Column(name = "fecha_vencimiento_licencia")
    private String fechaVencimientoLicencia;

    @OneToMany(mappedBy = "interesado")
    private Set<Prueba> pruebas = new HashSet<>();


    public Interesado(String tipoDocumento, String documento, String nombre, String apellido, boolean restringido, int nroLicencia, String fechaVencimientoLicencia) {
        this.tipoDocumento = tipoDocumento;
        this.documento = documento;
        this.nombre = nombre;
        this.apellido = apellido;
        this.restringido = restringido;
        this.nroLicencia = nroLicencia;
        this.fechaVencimientoLicencia = fechaVencimientoLicencia;
    }
    public Interesado() {

    }


    @Override
    public String toString() {
        return "Interesado{" +
                "tipoDocumento='" + tipoDocumento + '\'' +
                ", documento='" + documento + '\'' +
                ", nombre='" + nombre + '\'' +
                ", apellido='" + apellido + '\'' +
                ", restringido=" + restringido +
                ", nroLicencia=" + nroLicencia +
                ", fechaVencimientoLicencia='" + fechaVencimientoLicencia + '\'' +
                '}';
    }


    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }

    public String getTipoDocumento() {
        return tipoDocumento;
    }
    public void setTipoDocumento(String tipoDocumento) {
        this.tipoDocumento = tipoDocumento;
    }

    public String getDocumento() {
        return documento;
    }
    public void setDocumento(String documento) {
        this.documento = documento;
    }

    public String getNombre() {
        return nombre;
    }
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }
    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public boolean getRestringido() {
        return restringido;
    }
    public void setRestringido(boolean restringido) {
        this.restringido = restringido;
    }

    public int getNroLicencia() {
        return nroLicencia;
    }
    public void setNroLicencia(int nroLicencia) {
        this.nroLicencia = nroLicencia;
    }

    public String getFechaVencimientoLicencia() {
        return fechaVencimientoLicencia;
    }
    public void setFechaVencimientoLicencia(String fechaVencimientoLicencia) {
        this.fechaVencimientoLicencia = fechaVencimientoLicencia;
    }

    public Set<Prueba> getPruebas() {
        return pruebas;
    }
    public void setPruebas(Set<Prueba> pruebas) {
        this.pruebas = pruebas;
    }
}
