package feja.localzero;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;

import javax.sql.DataSource;
import java.sql.Connection;

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

