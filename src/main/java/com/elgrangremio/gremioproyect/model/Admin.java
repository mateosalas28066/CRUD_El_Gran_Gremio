package com.elgrangremio.gremioproyect.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "admins")
public class Admin {

    @Id
    private String id;

    private String codigo_admin;
    private String nombre;
    private String apellido;
    private String email;
    private String password; // requerido para login
    private String rol;
    private String telefono;
}
