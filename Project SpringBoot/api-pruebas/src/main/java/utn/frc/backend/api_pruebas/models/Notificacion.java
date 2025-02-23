package utn.frc.backend.api_pruebas.models;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "Notificaciones")
public class Notificacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String descripcion;

    private LocalDate fecha;

    @OneToOne(optional = true)
    private Posicion posicion;

    @ManyToOne(optional = true)
    private Prueba prueba;

    @ManyToMany
    @JoinTable(
            name = "Notificaciones_Interesados",
            joinColumns = @JoinColumn(name = "notificacion_id"),
            inverseJoinColumns = @JoinColumn(name = "interesado_id"))
    private Set<Interesado> interesados = new HashSet<>();


    public Notificacion(String descripcion, LocalDate fecha) {
        this.descripcion = descripcion;
        this.fecha = fecha;
    }
    public Notificacion() {

    }


    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }

    public String getDescripcion() {
        return descripcion;
    }
    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public LocalDate getFecha() {
        return fecha;
    }
    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public Set<Interesado> getInteresados() {
        return interesados;
    }
    public void setInteresados(Set<Interesado> interesados) {
        this.interesados = interesados != null ? interesados : new HashSet<>();
    }

    public Posicion getPosicion() {
        return posicion;
    }
    public void setPosicion(Posicion posicion) {
        this.posicion = posicion;
    }

    public Prueba getPrueba() {
        return prueba;
    }
    public void setPrueba(Prueba prueba) {
        this.prueba = prueba;
    }
}
