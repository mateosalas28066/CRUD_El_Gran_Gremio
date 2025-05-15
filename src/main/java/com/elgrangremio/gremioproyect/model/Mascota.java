package com.elgrangremio.gremioproyect.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "mascotas")
public class Mascota {

    @Id
    private String id;

    private String codigo_mascota;
    private String nombre;
    private String especie;
    private String raza;
    private int edad;
    private String peso;
    private String imagen;
    private String whatsapp;

    private String estado;
    private String codigo_humano;
}
