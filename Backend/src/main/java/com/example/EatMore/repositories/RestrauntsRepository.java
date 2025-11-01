package com.example.EatMore.repositories;

import com.example.EatMore.entity.Restraunt;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RestrauntsRepository extends MongoRepository<Restraunt, String> {

}
