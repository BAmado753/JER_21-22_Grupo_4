package es.stormedia.TinyTussel;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

public class OnlineStateHandler  extends TextWebSocketHandler{
	private Map<String, WebSocketSession> sessionList = new ConcurrentHashMap<>();
	
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		System.out.println("Nueva sesion: " + session.getId());
		sessionList.put(session.getId(), session);
	}
	
	
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		System.out.println("Sesion cerrada: " + session.getId());
		sessionList.remove(session.getId());
	}
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		String msg = message.getPayload();
		session.sendMessage(new TextMessage(msg));
		broadcastMessage(session, message.getPayload());
		//String msg = message.getPayload();
		//session.sendMessage(new TextMessage(msg));
	}
	private void broadcastMessage(WebSocketSession session, String payload) throws IOException {
		for(WebSocketSession session_aux : sessionList.values()) {
			if(!session_aux.getId().equals(session.getId())) {
				String newPayload="jugador "+session.getId()+"conectado";
				session_aux.sendMessage(new TextMessage(newPayload));
			}
		}
	}
}
