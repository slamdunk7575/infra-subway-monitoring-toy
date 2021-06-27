package nextstep.subway.auth.ui;

import nextstep.subway.auth.application.AuthService;
import nextstep.subway.auth.dto.TokenRequest;
import nextstep.subway.auth.dto.TokenResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import static net.logstash.logback.argument.StructuredArguments.kv;

@RestController
public class AuthController {

    private static final Logger console = LoggerFactory.getLogger("console");
    private static final Logger file = LoggerFactory.getLogger("file");
    private static final Logger json = LoggerFactory.getLogger("json");

    private AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login/token")
    public ResponseEntity<TokenResponse> login(@RequestBody TokenRequest request) {
        TokenResponse token = authService.login(request);

        console.info("["+ request.getEmail()+ "] 님이 로그인 하셨습니다.");
        file.info("[" +request.getEmail()+ "] 님이 로그인 하셨습니다.");
        json.info("{}", kv("loginEmail", request.getEmail()));

        return ResponseEntity.ok().body(token);
    }
}
