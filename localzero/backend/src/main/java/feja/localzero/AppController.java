package feja.localzero;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
@RequestMapping("/localzero")
public class AppController {

    @GetMapping("")
    public String index() {
        return "index.html";
    }

    @GetMapping("/frontpage")
    public String frontpage() {
        System.out.println("test");
        return "forward:/frontpage.html";
    }

    @GetMapping("/signup")
    public String signupPage() {
        return "forward:/signup.html";
    }

}
