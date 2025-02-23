package utn.frc.backend.api_pruebas.models;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "marcas")
public class Marca {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String nombre;

    @OneToMany(mappedBy = "marca")
    private Set<Modelo> modelos = new HashSet<>();


    public Marca(String nombre) {
        this.nombre = nombre;
    }
    public Marca() {

    }

    @Override
    public String toString() {
        return "Marca{" +
                "nombre='" + nombre + '\'' +
                '}';
    }

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Set<Modelo> getModelos() {
        return modelos;
    }
    public void setModelos(Set<Modelo> modelos) {
        this.modelos = modelos;
    }
}
