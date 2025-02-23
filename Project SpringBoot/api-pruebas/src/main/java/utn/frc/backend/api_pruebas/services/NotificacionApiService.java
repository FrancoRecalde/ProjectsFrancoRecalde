package utn.frc.backend.api_pruebas.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.Base64;
import utn.frc.backend.api_pruebas.dtos.NotificacionDto;

@Service
public class NotificacionApiService {

    // RestTemplate es una clase de Spring que permite realizar solicitudes HTTP a otros servicios
    private final RestTemplate restTemplate;

    // Obtener la URL del servicio de notificaciones desde el archivo de configuración
    @Value("${configuracion.notificaciones.url}")
    private String notificacionApiUrl;

    public NotificacionApiService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    /**
     * Realiza una solicitud POST al servicio de notificaciones para enviar una notificación de zona inválida
     * @param notificacionDto DTO con los datos de la notificación
     */
    public void postNotificacionZonaInvalida(NotificacionDto notificacionDto) {
        // Obtener el usuario autenticado
        String usuario = obtenerUsuarioAutenticado();
        System.out.println("----------------------------------------------------------------------\n" + usuario);

        if (usuario != null) {
            // Obtener la contraseña del usuario desde tu base de datos o desde la configuración de seguridad
            String password = "123";  // Aquí debería ir la contraseña del usuario autenticado

            // Codificar las credenciales en base64 para la autenticación básica
            String credentials = usuario + ":" + password;
            String base64Credentials = Base64.getEncoder().encodeToString(credentials.getBytes());

            // Crear los encabezados HTTP
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Basic " + base64Credentials);

            // Crear la entidad con el cuerpo y los encabezados
            HttpEntity<NotificacionDto> entity = new HttpEntity<>(notificacionDto, headers);

            // Realizar la solicitud POST
            restTemplate.exchange(notificacionApiUrl + "/api/notificaciones/zona-invalida", HttpMethod.POST, entity, String.class);
        }
    }

    /**
     * Obtiene el nombre de usuario del usuario autenticado
     * @return Nombre de usuario del usuario autenticado
     */
    private String obtenerUsuarioAutenticado() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication != null ? authentication.getName() : null;
    }
}
