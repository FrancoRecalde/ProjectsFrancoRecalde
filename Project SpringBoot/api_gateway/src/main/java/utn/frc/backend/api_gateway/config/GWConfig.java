package utn.frc.backend.api_gateway.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GWConfig {

    /**
     * Configuración de las rutas de los microservicios
     * @param builder RouteLocatorBuilder
     * @param uriPruebas URL del Microservicio de Pruebas
     * @param uriNotificaciones URL del Microservicio de Notificaciones
     * @return RouteLocator
     */
    @Bean
    public RouteLocator configurarRutas(RouteLocatorBuilder builder,
                                        @Value("${api-gw-tp.url-microservicio-pruebas}") String uriPruebas,
                                        @Value("${api-gw-tp.url-microservicio-notificaciones}") String uriNotificaciones){
        return builder.routes()
                // Ruteo al Microservicio de Pruebas
                .route(p -> p.path("/api/pruebas/**").uri(uriPruebas))
                // Ruteo al Microservicio de Posiciones
                .route(p -> p.path("/api/posiciones/**").uri(uriPruebas))
                // Ruteo al Microservicio de Notificaciones
                .route(p -> p.path("/api/notificaciones/**").uri(uriNotificaciones))
                // Ruteo al Microservicio de Reportes
                .route(p -> p.path("/api/reportes/**").uri(uriPruebas))
                // Ruteo de Deslogueo
                .route((p -> p.path("/api/logout").uri(uriPruebas)))
                .build();
    }
}
