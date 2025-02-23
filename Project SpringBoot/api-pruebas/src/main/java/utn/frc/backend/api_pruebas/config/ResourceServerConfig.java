package utn.frc.backend.api_pruebas.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.http.HttpMethod;
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
     * Configuración de la seguridad de la aplicación
     * @param http
     * @return
     * @throws Exception
     */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                // Configuración de las rutas que requieren autorización
                .authorizeHttpRequests(authorize -> authorize
                        // GET /api/pruebas/** -> Permitido para todos
                        .requestMatchers(HttpMethod.GET, "/api/pruebas/**").permitAll()
                        // /api/pruebas/** -> Permitido para EMPLEADO
                        .requestMatchers("/api/pruebas/**").hasRole("EMPLEADO")
                        // /api/posiciones/** -> Permitido para USER
                        .requestMatchers("api/posiciones/**").hasRole("USER")
                        // /api/notificaciones/** -> Permitido para todos
                        .requestMatchers("/api/logout").permitAll()
                        // /api/pruebas/activas/** -> Permitido para todos
                        .requestMatchers("/api/pruebas/activas/**").permitAll()
                        // /api/reportes/** -> Permitido para todos
                        .requestMatchers("/api/reportes/**").permitAll()
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
                        .logoutSuccessUrl("/api/pruebas/activas")
                )
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
                        .maximumSessions(1)
                );
        return http.build();
    }


    /**
     * Configuración de los usuarios de la aplicación
     * @param passwordEncoder
     * @return
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