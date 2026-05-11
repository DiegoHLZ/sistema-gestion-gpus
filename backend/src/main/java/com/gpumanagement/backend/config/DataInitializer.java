package com.gpumanagement.backend.config;

import com.gpumanagement.backend.user.model.Role;
import com.gpumanagement.backend.user.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final RoleRepository roleRepository;

    @Override
    public void run(String... args) {

        if (roleRepository.findByName("ADMIN").isEmpty()) {

            roleRepository.save(
                    Role.builder()
                            .name("ADMIN")
                            .build()
            );
        }

        if (roleRepository.findByName("CLIENT").isEmpty()) {

            roleRepository.save(
                    Role.builder()
                            .name("CLIENT")
                            .build()
            );
        }
    }
}
