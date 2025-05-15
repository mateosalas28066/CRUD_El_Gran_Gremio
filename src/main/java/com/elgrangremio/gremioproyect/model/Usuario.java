package com.elgrangremio.gremioproyect.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Data
@Document(collection = "usuarios")
public class Usuario {

    @Id
    private String codigo_humano;
    private String nombre;
    private String apellido;
    private String email;
    private String telefono;
    private String direccion;
    private String password;

}
