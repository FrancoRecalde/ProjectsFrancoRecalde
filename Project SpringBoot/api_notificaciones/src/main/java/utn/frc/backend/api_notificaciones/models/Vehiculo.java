package utn.frc.backend.api_notificaciones.models;

import jakarta.persistence.*;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "vehiculos")
public class Vehiculo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String patente;

    @ManyToOne
    @JoinColumn(name = "id_modelo", nullable = false)
    @Cascade(CascadeType.PERSIST)
    private Modelo modelo;

    @OneToMany(mappedBy = "vehiculo")
    private Set<Prueba> pruebas = new HashSet<>();

    @OneToMany(mappedBy = "vehiculo")
    private Set<Posicion> posiciones = new HashSet<>();


    public Vehiculo(String patente, Modelo modelo) {
        this.patente = patente;
        this.modelo = modelo;
    }
    public Vehiculo() {

    }


    @Override
    public String toString() {
        return "Vehiculo{" +
                "patente='" + patente + '\'' +
                ", modelo=" + modelo +
                ", posiciones=" + posiciones +
                '}';
    }


    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }

    public String getPatente() {
        return patente;
    }
    public void setPatente(String patente) {
        this.patente = patente;
    }

    public Modelo getModelo() {
        return modelo;
    }
    public void setModelo(Modelo modelo) {
        this.modelo = modelo;
    }

    public Set<Prueba> getPruebas() {
        return pruebas;
    }
    public void setPruebas(Set<Prueba> pruebas) {
        this.pruebas = pruebas;
    }

    public Set<Posicion> getPosiciones() {
        return posiciones;
    }
    public void setPosiciones(Set<Posicion> posiciones) {
        this.posiciones = posiciones;
    }
}
