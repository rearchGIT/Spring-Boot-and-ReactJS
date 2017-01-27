package com.react;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.react.domain.Person;
import com.react.repository.PersonRepository;

@Component
public class DatabaseLoader implements CommandLineRunner {

    private final PersonRepository repository;

    @Autowired
    public DatabaseLoader(PersonRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... strings) throws Exception {
        this.repository.save(new Person("George", "Clooney"));
        this.repository.save(new Person("Ralph", "Fiennes"));
        this.repository.save(new Person("Jennifer", "Anniston"));
    }
}
