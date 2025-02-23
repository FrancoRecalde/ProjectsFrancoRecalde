package utn.frc.backend.api_pruebas.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import utn.frc.backend.api_pruebas.dtos.ConfiguracionDto;
import utn.frc.backend.api_pruebas.dtos.ZonaRestringidaDto;
import utn.frc.backend.api_pruebas.models.*;
import utn.frc.backend.api_pruebas.repositories.PosicionRepository;
import utn.frc.backend.api_pruebas.repositories.VehiculoRepository;

@Service
public class PosicionesService {
    // Repositorio de posiciones
    private final PosicionRepository repository;

    // Repositorio de vehículos
    private final VehiculoRepository vehiculoRepository;
    // Servicio de configuración
    private final ConfiguracionApiService configuracionApiService;

    @Autowired
    public PosicionesService(PosicionRepository repository, VehiculoRepository vehiculoRepository, ConfiguracionApiService configuracionApiService) {
        this.repository = repository;
        this.vehiculoRepository = vehiculoRepository;
        this.configuracionApiService = configuracionApiService;
    }


    public Iterable<Posicion> getAll(){
        return repository.findAll();
    }

    public Posicion getById(int id) {
        return repository.findById(id).orElseThrow();
    }

    public Posicion create(Posicion posicion) {
        // Buscar o guardar el vehiculo
        Vehiculo vehiculo = vehiculoRepository.findById(posicion.getVehiculo().getId())
                .orElseThrow(() -> new RuntimeException("Vehiculo no encontrado"));
        posicion.setVehiculo(vehiculo);

        // Guardar la posicion
        return repository.save(posicion);
    }

    public Posicion update(int id, Posicion posicionDetails){
        Posicion posicion = getById(id);

        posicion.setFechaHora(posicionDetails.getFechaHora());
        posicion.setLatitud(posicionDetails.getLatitud());
        posicion.setLongitud(posicionDetails.getLongitud());
        posicion.setVehiculo(posicionDetails.getVehiculo());

        return repository.save(posicion);
    }

    public void delete(int id){
        repository.deleteById(id);
    }


    /**
     * Verifica si una posición es válida
     * @param posicion Posición a verificar
     * @return true si la posición es válida, false en caso contrario
     */
    public boolean isPositionValid(Posicion posicion){
        // Obtener la configuración
        ConfiguracionDto configuracion = configuracionApiService.getConfiguracion();

        // Verificar si está dentro del radio permitido
        double distancia = calcularDistancia(posicion.getLatitud(), posicion.getLongitud(),
                                            configuracion.getCoordenadasAgencia().getLat(),
                                            configuracion.getCoordenadasAgencia().getLon());

        if (distancia > configuracion.getRadioAdmitidoKm())
            return false; // Fuera del radio permitido

        // Validar si está dentro de una zona restringida
        for (ZonaRestringidaDto zona : configuracion.getZonasRestringidas()) {
            if (estaDentroDeZonaRestringida(posicion, zona)) {
                return false; // Dentro de una zona restringida
            }
        }
        return true; // La posición es válida
    }

    /**
     * Calcula la distancia entre dos coordenadas geográficas
     * @param lat1 Latitud de la primera coordenada
     * @param lon1 Longitud de la primera coordenada
     * @param lat2 Latitud de la segunda coordenada
     * @param lon2 Longitud de la segunda coordenada
     * @return Distancia en kilómetros
     */
    public double calcularDistancia(double lat1, double lon1, double lat2, double lon2) {
        double radioTierra = 6371; // en kilómetros

        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);

        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2)) *
                        Math.sin(dLon / 2) * Math.sin(dLon / 2);

        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return radioTierra * c;
    }
    /**
     * Verifica si una posición está dentro de una zona restringida
     * @param posicion Posición a verificar
     * @param zona Zona restringida
     * @return true si la posición está dentro de la zona restringida, false en caso contrario
     */
    private boolean estaDentroDeZonaRestringida(Posicion posicion, ZonaRestringidaDto zona) {
        double lat = posicion.getLatitud();
        double lon = posicion.getLongitud();

        double latNoroeste = zona.getNoroeste().getLat();
        double lonNoroeste = zona.getNoroeste().getLon();
        double latSureste = zona.getSureste().getLat();
        double lonSureste = zona.getSureste().getLon();

        // Comprobar si la posición está dentro de los límites de la zona restringida
        return (lat <= latNoroeste && lat >= latSureste) &&
                (lon >= lonNoroeste && lon <= lonSureste);
    }
}
