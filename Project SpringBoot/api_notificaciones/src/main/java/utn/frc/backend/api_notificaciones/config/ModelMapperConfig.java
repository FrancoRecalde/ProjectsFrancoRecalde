package utn.frc.backend.api_notificaciones.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelMapperConfig {

    /**
     * Configuración de ModelMapper
     * @return ModelMapper
     */
    @Bean
    public ModelMapper modelMapper() {
       return new ModelMapper();
    }
}