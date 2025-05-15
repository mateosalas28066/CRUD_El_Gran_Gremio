package com.elgrangremio.gremioproyect.repository;

import com.elgrangremio.gremioproyect.model.Usuario;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends MongoRepository<Usuario, String> {
    @Query("{ 'email' : ?0 }")
    Usuario findFirstByEmail(String email);

}
