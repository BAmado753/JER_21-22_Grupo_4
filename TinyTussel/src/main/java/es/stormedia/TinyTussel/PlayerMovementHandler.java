package es.stormedia.TinyTussel;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.json.simple.JSONObject;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
public class PlayerMovementHandler extends TextWebSocketHandler{

private Map<String, WebSocketSession> sessionList = new ConcurrentHashMap<>();
private Map<String, Sala> jgSalaList = new ConcurrentHashMap<>();

	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		sessionList.put(session.getId(), session);
		
	}
	
	
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		sessionList.remove(session.getId());
	}
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		String msg = message.getPayload();
		if(msg.equals((char)34+"S1"+(char)34)) {
			jgSalaList.put(session.getId(), new Sala(session.getId(),"sala-1",session));
			}
		else if(msg.equals((char)34+"S2"+(char)34)) {
			jgSalaList.put(session.getId(), new Sala(session.getId(),"sala-2",session));
		}
		else if(msg.equals((char)34+"S3"+(char)34)) {
			jgSalaList.put(session.getId(), new Sala(session.getId(),"sala-3",session));
		}
		else if(msg.equals((char)34+"S4"+(char)34)){
			jgSalaList.put(session.getId(), new Sala(session.getId(),"sala-4",session));
		}
		sendMessageInRoom(session, message.getPayload());
		
	}
	private void sendMessageInRoom(WebSocketSession session, String payload) throws IOException {
		System.out.println("Tamaño jugaSalList:"+jgSalaList.size());
		String sala="null";
		for(Sala jugSala_aux : jgSalaList.values()) {
			if(jugSala_aux.getSesionID().equals(session.getId())) {
				sala=jugSala_aux.getSala();
			}
		}
		System.out.println("Sala:"+sala);
		for(Sala jugSala_aux : jgSalaList.values()) {
			if(jugSala_aux.getSala().equals(sala)&& !jugSala_aux.getSesionID().equals(session.getId())) {
				//synchronized(jugSala_aux.getSesion()) {
					jugSala_aux.getSesion().sendMessage(new TextMessage(payload));
				//}
			}
		}
	}
	private void broadcastMessage(WebSocketSession session, String payload) throws IOException {
		//System.out.println("entra al broadcast");
		for(WebSocketSession session_aux : sessionList.values()) {
			if(!session_aux.getId().equals(session.getId())) {
				session_aux.sendMessage(new TextMessage(payload));
			}
		}
	}
}
