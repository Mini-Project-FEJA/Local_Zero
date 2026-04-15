package feja.localzero.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.sql.DataSource;
import java.sql.Connection;

@RestController
public class TestController {

    @Autowired
    private DataSource dataSource;

    @GetMapping("/db-test")
    public String testDb() {
        try (Connection conn = dataSource.getConnection()) {
            return "DB funkar!";
        } catch (Exception e) {
            return "DB error: " + e.getMessage();
        }
    }
}

