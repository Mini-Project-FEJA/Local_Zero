package feja.localzero;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class AppController {

    @GetMapping("/index")
    public String index() {
        return "index";
    }

    @GetMapping("/frontpage")
    public String frontpage() {
        return "frontpage";
    }
}
