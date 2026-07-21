package com.gpumanagement.backend.gpu.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "gpus")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Gpu {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String model;

    private Integer memory;

    private String providerCloud;

    private String region;

    private Double pricePerHour;

    private Boolean available;
}
