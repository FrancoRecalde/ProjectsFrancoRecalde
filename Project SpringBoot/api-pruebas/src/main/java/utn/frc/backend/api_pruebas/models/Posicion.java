package utn.frc.backend.api_pruebas.models;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Entity
@Table(name = "posiciones")
public class Posicion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "fecha_hora")
    private String fechaHora;

    private double latitud;

    private double longitud;

    @ManyToOne
    @JoinColumn(name = "ID_VEHICULO")
    private Vehiculo vehiculo;

    public Posicion(String fechaHora, double latitud, double longitud, Vehiculo vehiculo) {
        this.fechaHora = fechaHora;
        this.latitud = latitud;
        this.longitud = longitud;
        this.vehiculo = vehiculo;
    }
    public Posicion() {

    }


    @Override
    public String toString() {
        return "Posicion{" +
                "fechaHora='" + fechaHora + '\'' +
                ", latitud=" + latitud +
                ", longitud=" + longitud +
                '}';
    }

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }

    public String getFechaHora() {
        return fechaHora;
    }
    public void setFechaHora(String fechaHora) {
        this.fechaHora = fechaHora;
    }

    public double getLatitud() {
        return latitud;
    }
    public void setLatitud(double latitud) {
        this.latitud = latitud;
    }

    public double getLongitud() {
        return longitud;
    }
    public void setLongitud(double longitud) {
        this.longitud = longitud;
    }

    public Vehiculo getVehiculo() {
        return vehiculo;
    }
    public void setVehiculo(Vehiculo vehiculo) {
        this.vehiculo = vehiculo;
    }

    /**
     * Valida si la fecha de la posicion se encuentra dentro del periodo de fechas
     * @param fecha_inicio Fecha de inicio del periodo
     * @param fecha_fin Fecha de fin del periodo
     * @return true si la fecha de la posicion se encuentra dentro del periodo de fechas
     */
    public boolean validarPeriodo(LocalDate fecha_inicio, LocalDate fecha_fin) {
        LocalDate fecha = LocalDate.parse(fechaHora, DateTimeFormatter.ofPattern("dd-MM-yyyy")) ;
        return(fecha_inicio.equals(fecha) || fecha_fin.equals(fecha) ||
                (fecha.isAfter(fecha_inicio) && fecha.isBefore(fecha_fin)));
    }
}
