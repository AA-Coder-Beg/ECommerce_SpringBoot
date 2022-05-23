package com.hcl.dao;

import com.hcl.entity.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "countries", path="countries") //path exposes the endpoint
public interface CountryRepository extends JpaRepository<Country, Integer> {
}
