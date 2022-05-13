package com.hcl.dao;

import com.hcl.entity.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "country", path="country") //path exposes the endpoint
public interface CountryRepository extends JpaRepository<Country, Integer> {
}
