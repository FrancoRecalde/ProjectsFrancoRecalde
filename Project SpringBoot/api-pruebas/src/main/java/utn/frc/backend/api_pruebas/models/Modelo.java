package utn.frc.backend.api_pruebas.models;

import jakarta.persistence.*;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "modelos")
public class Modelo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String descripcion;

    @ManyToOne
    @JoinColumn(name = "id_marca", nullable = false)
    @Cascade(CascadeType.PERSIST)
    private Marca marca;

    @OneToMany(mappedBy = "modelo")
    private Set<Vehiculo> vehiculos = new HashSet<>();


    public Modelo(String descripcion, Marca marca) {
        this.descripcion = descripcion;
        this.marca = marca;
    }
    public Modelo() {

    }

    @Override
    public String toString() {
        return "Modelo{" +
                "descripcion='" + descripcion + '\'' +
                ", " + marca +
                '}';
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

    public Marca getMarca() {
        return marca;
    }
    public void setMarca(Marca marca) {
        this.marca = marca;
    }

    public Set<Vehiculo> getVehiculos() {
        return vehiculos;
    }
    public void setVehiculos(Set<Vehiculo> vehiculos) {
        this.vehiculos = vehiculos;
    }
}
