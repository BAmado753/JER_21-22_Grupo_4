package es.stormedia.TinyTussel;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class TinyTusselApplication {

	@Bean
	public Player player() {
		return new Player();
	}
	
	public static void main(String[] args) {
		SpringApplication.run(TinyTusselApplication.class, args);
	}

}
