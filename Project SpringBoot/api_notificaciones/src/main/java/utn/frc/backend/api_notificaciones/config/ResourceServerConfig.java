package utn.frc.backend.api_notificaciones.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class ResourceServerConfig {

    /**
     * Configuración de seguridad
     * @param http Objeto HttpSecurity
     * @return SecurityFilterChain
     * @throws Exception Excepción
     */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                // Configuración de autorización
                .authorizeHttpRequests(authorize -> authorize
                        // /api/notificaciones -> Permitido para EMPLEADO
                        .requestMatchers("/api/notificaciones/promocion").hasRole("EMPLEADO")
                        // /api/notificaciones/zona-invalida -> Permitido para USER
                        .requestMatchers("/api/notificaciones/zona-invalida").hasRole("USER")
                        // /api/logout -> Permitido para todos
                        .requestMatchers("/api/logout").permitAll()
                        // /error -> Permitido para todos
                        .requestMatchers("/error").permitAll()
                        // Todas las demás rutas -> Permitido para todos
                        .anyRequest().permitAll()
                )
                .httpBasic(Customizer.withDefaults())
                // Configuración de la sesión
                .logout(logout -> logout
                        .logoutUrl("/api/logout")
                        .invalidateHttpSession(true)
                        .clearAuthentication(true)
                        .deleteCookies("JSESSIONID")
                        .logoutSuccessUrl("/api/notificaciones") // Asegurar que esta URL sea accesible sin autenticación
                )
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
                        .maximumSessions(1)
                );
        return http.build();
    }

    /**
     * Configuración de usuarios
     * @param passwordEncoder Codificador de contraseñas
     * @return UserDetailsService
     */
    @Bean
    public UserDetailsService userDetailsService(PasswordEncoder passwordEncoder) {
        // Usuario EMPLEADO
        UserDetails empleado = User.withUsername("empleado")
                .password(passwordEncoder.encode("123"))
                .roles("EMPLEADO")
                .build();

        // Usuario ADMIN
        UserDetails admin = User.withUsername("admin")
                .password(passwordEncoder.encode("123"))
                .roles("ADMIN")
                .build();

        // Usuario USER
        UserDetails user = User.withUsername("user")
                .password(passwordEncoder.encode("123"))
                .roles("USER")
                .build();

        return new InMemoryUserDetailsManager(empleado, admin, user);
    }

    /**
     * Configuración del codificador de contraseñas
     * @return Codificador de contraseñas
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}