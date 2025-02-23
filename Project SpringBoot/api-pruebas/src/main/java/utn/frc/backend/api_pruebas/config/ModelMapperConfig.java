package utn.frc.backend.api_pruebas.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import utn.frc.backend.api_pruebas.dtos.PruebaDto;
import utn.frc.backend.api_pruebas.models.Prueba;

@Configuration
public class ModelMapperConfig {

    /**
     * Configuración de ModelMapper para mapear los DTOs a las entidades y viceversa
     * @return ModelMapper configurado
     */
    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();

        // Mapear los campos de un PruebaDto a una Prueba
        modelMapper.typeMap(PruebaDto.class, Prueba.class).addMappings(mapper -> {
            mapper.<Integer>map(src -> src.getEmpleado().getLegajo(), (dest, value) -> dest.getEmpleado().setLegajo(value));
            mapper.<Integer>map(src -> src.getInteresado().getId(), (dest, value) -> dest.getInteresado().setId(value));
            mapper.<Integer>map(src -> src.getVehiculo().getId(), (dest, value) -> dest.getVehiculo().setId(value));
            mapper.<Integer>map(src -> src.getVehiculo().getModelo().getId(), (dest, value) -> dest.getVehiculo().getModelo().setId(value));
            mapper.<Integer>map(src -> src.getVehiculo().getModelo().getMarca().getId(), (dest, value) -> dest.getVehiculo().getModelo().getMarca().setId(value));
        });

        // Mapear los campos de una Prueba a un PruebaDto
        modelMapper.typeMap(Prueba.class, PruebaDto.class).addMappings(mapper -> {
            mapper.<Integer>map(Prueba::getId, PruebaDto::setId);
        });

        return modelMapper;
    }
}