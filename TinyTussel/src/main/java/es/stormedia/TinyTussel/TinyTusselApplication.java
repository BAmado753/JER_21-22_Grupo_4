package es.stormedia.TinyTussel;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@SpringBootApplication
@EnableWebSocket
public class TinyTusselApplication implements WebSocketConfigurer {
	
	//WEBSOCKETS
	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		// TODO Auto-generated method stub
		registry.addHandler(onlineStateHandler(), "/online")
		.setAllowedOrigins("*");
		registry.addHandler(selectionHandler(), "/selections")
		.setAllowedOrigins("*");
		registry.addHandler(playerMovementHandler(), "/movePlayer1")
		.setAllowedOrigins("*");
		registry.addHandler(playerMovementHandler(), "/movePlayer2")
		.setAllowedOrigins("*");
		registry.addHandler(playerMovementHandler(), "/movePlayer3")
		.setAllowedOrigins("*");
		registry.addHandler(playerMovementHandler(), "/movePlayer4")
		.setAllowedOrigins("*");
		registry.addHandler(itemsRespawnHandler(), "/itemsRespawn")
		.setAllowedOrigins("*");
	}
	
	
	@Bean
	public OnlineStateHandler onlineStateHandler() {
		return new OnlineStateHandler();
	}
	
	@Bean
	public SelectionScreensHandler selectionHandler() {
		return new SelectionScreensHandler();
	}
	@Bean
	public PlayerMovementHandler playerMovementHandler() {
		return new PlayerMovementHandler();
	}
	@Bean
	public ItemsRespawnHandler itemsRespawnHandler() {
		return new ItemsRespawnHandler();
	}
	
	
	
	//API REST
	@Bean
	public Player player() {
		return new Player();
	}
	
	public static void main(String[] args) {
		SpringApplication.run(TinyTusselApplication.class, args);
	}

	

}
