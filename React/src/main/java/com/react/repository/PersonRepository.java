package com.react.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.react.domain.Person;

/*This annotation makes sure that the Repository is available on the link which is defined in the application.properties */
@RepositoryRestResource(collectionResourceRel = "people", path = "people")
public interface PersonRepository extends CrudRepository<Person, Long> {
   /*In case of the need of paging, simply use: extends PagingAndSortingRepository */
   
    List<Person> findByLastName(@Param("name") String name);

    @Override
    void delete(Long aLong);
    
 /*A list of commands for UNIX terminal:
    
  Direct link to a user by id
  curl http://localhost:8080/api/people/1
  
  Adding a new Person
  curl -i -X POST -H "Content-Type:application/json" -d '{  "firstName" : "Sandra",  "lastName" : "Bullock" }' http://localhost:8080/api/people
     
     
  Searching by name
  curl http://localhost:8080/api/people/search/findByLastName?name=Clooney
     
     
   Replacing a record of id 1
   curl -X PATCH -H "Content-Type:application/json" -d '{ "firstName": "Julia" }' http://localhost:8080/api/people/1
   curl -X PATCH -H "Content-Type:application/json -d '{ "firstName": "Julia", "lastName": "Roberts" }' http://localhost:8080/api/people/1
     
     
   Deleting a record of id 1
   curl -X DELETE http://localhost:8080/api/people/1 
   */
}
