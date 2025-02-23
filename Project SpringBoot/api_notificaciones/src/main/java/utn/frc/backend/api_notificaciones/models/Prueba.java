package utn.frc.backend.api_notificaciones.models;

import jakarta.persistence.*;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Entity
@Table(name = "pruebas")
public class Prueba {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "fecha_hora_inicio")
    private String fechaHoraInicio;

    @Column(name = "fecha_hora_fin", nullable = true)
    private String fechaHoraFin;

    private String comentarios;

    @ManyToOne
    @JoinColumn(name = "id_empleado", nullable = false)
    @Cascade(CascadeType.PERSIST)
    private Empleado empleado;

    @ManyToOne
    @JoinColumn(name = "id_interesado", nullable = false)
    @Cascade(CascadeType.PERSIST)
    private Interesado interesado;

    @ManyToOne
    @JoinColumn(name = "id_vehiculo", nullable = false)
    @Cascade(CascadeType.PERSIST)
    private Vehiculo vehiculo;


    public Prueba(String fechaHoraInicio, String fechaHoraFin, String comentarios, Empleado empleado, Interesado interesado, Vehiculo vehiculo) {
        this.fechaHoraInicio = fechaHoraInicio;
        this.fechaHoraFin = fechaHoraFin;
        this.comentarios = comentarios;
        this.empleado = empleado;
        this.interesado = interesado;
        this.vehiculo = vehiculo;
    }
    public Prueba() {

    }

    @Override
    public String toString() {
        return "Prueba{" +
                "fechaHoraInicio='" + fechaHoraInicio + '\'' +
                ", fechaHoraFin='" + fechaHoraFin + '\'' +
                ", comentarios='" + comentarios + '\'' +
                ", " + empleado +
                ", " + interesado +
                ", " + vehiculo +
                '}';
    }


    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }

    public String getFechaHoraInicio() {
        return fechaHoraInicio;
    }
    public void setFechaHoraInicio(String fechaHoraInicio) {
        this.fechaHoraInicio = fechaHoraInicio;
    }

    public String getFechaHoraFin() {
        return fechaHoraFin;
    }
    public void setFechaHoraFin(String fechaHoraFin) {
        this.fechaHoraFin = fechaHoraFin;
    }

    public boolean getActivo(LocalDate momento){
        if (fechaHoraFin == null)
            return true;

        return !momento.isAfter(LocalDate.parse(fechaHoraInicio,DateTimeFormatter.ofPattern("dd-MM-yyyy")))
                && !momento.isBefore(LocalDate.parse(fechaHoraFin,DateTimeFormatter.ofPattern("dd-MM-yyyy")));
    }
    public boolean getActivo(){
        return getActivo(LocalDate.now());
    }

    public String getComentarios() {
        return comentarios;
    }
    public void setComentarios(String comentarios) {
        this.comentarios = comentarios;
    }

    public Empleado getEmpleado() {
        return empleado;
    }
    public void setEmpleado(Empleado empleado) {
        this.empleado = empleado;
    }

    public Interesado getInteresado() {
        return interesado;
    }
    public void setInteresado(Interesado interesado) {
        this.interesado = interesado;
    }

    public Vehiculo getVehiculo() {
        return vehiculo;
    }
    public void setVehiculo(Vehiculo vehiculo) {
        this.vehiculo = vehiculo;
    }
}
