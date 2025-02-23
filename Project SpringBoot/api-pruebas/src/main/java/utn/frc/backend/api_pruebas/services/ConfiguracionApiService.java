package utn.frc.backend.api_pruebas.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import utn.frc.backend.api_pruebas.dtos.ConfiguracionDto;

import java.util.Collections;

@Service
public class ConfiguracionApiService {
    // RestTemplate es una clase de Spring que permite realizar solicitudes HTTP a otros servicios
    private final RestTemplate restTemplate;

    // Obtener la URL del servicio de configuración desde el archivo de configuración
    @Value("${configuracion.api.url}")
    private String configuracionApiUrl;

    public ConfiguracionApiService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    /**
     * Realiza una solicitud GET al servicio de configuración para obtener la configuración del sistema
     * @return DTO con la configuración del sistema
     */
    public ConfiguracionDto getConfiguracion() {
        // Crear los encabezados HTTP
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        HttpEntity<String> entity = new HttpEntity<>(headers);

        // Realizar la solicitud GET
        try{
            ResponseEntity<ConfiguracionDto> response =  restTemplate.exchange(configuracionApiUrl, HttpMethod.GET, entity, ConfiguracionDto.class);
            System.out.println("Respuesta a API externa:" + response.getBody());

            return response.getBody();
        } catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }
}
