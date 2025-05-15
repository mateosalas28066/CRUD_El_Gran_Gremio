package com.elgrangremio.gremioproyect.repository;

import com.elgrangremio.gremioproyect.model.Admin;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends MongoRepository<Admin, String> {
    @Query("{ 'email' : ?0 }")
    Admin findFirstByEmail(String email);

}
