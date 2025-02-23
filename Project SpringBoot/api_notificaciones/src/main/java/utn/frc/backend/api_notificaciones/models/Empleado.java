package utn.frc.backend.api_notificaciones.models;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "empleados")
public class Empleado {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int legajo;

    private String nombre;

    private String apellido;

    @Column(name = "telefono_contacto")
    private long telefonoContacto;

    @OneToMany(mappedBy = "empleado")
    private Set<Prueba> pruebas = new HashSet<>();


    public Empleado(String nombre, String apellido, long telefonoContacto) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.telefonoContacto = telefonoContacto;
    }
    public Empleado() {

    }


    @Override
    public String toString() {
        return "Empleado{" +
                "nombre='" + nombre + '\'' +
                ", apellido='" + apellido + '\'' +
                ", telefonoContacto=" + telefonoContacto +
                '}';
    }


    public int getLegajo() {
        return legajo;
    }
    public void setLegajo(int legajo) {
        this.legajo = legajo;
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

    public long getTelefonoContacto() {
        return telefonoContacto;
    }
    public void setTelefonoContacto(long telefonoContacto) {
        this.telefonoContacto = telefonoContacto;
    }

    public Set<Prueba> getPruebas() {
        return pruebas;
    }
    public void setPruebas(Set<Prueba> pruebas) {
        this.pruebas = pruebas;
    }
}
