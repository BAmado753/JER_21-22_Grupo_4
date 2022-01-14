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
private String jugSala []=new String [7];
	@SuppressWarnings("unchecked")
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		sessionList.put(session.getId(), session);
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("ID", session.getId().toString());
	      jsonObject.put("Sala", "null");
	      int i=0;
	      while(jugSala[i]=="null") {
	    	  jugSala[0]=jsonObject.toString();
	    	  i++;
	      }
	}
	
	
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		sessionList.remove(session.getId());
	}
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		//String msg = message.getPayload();
		//session.sendMessage(new TextMessage(msg));
		//ObjectMapper mapper = new ObjectMapper();
		//JsonNode node = mapper.readTree(message.toString());
		//String sala = node.get("sala").asText();
		JSONObject jsonObject = new JSONObject();

		broadcastMessage(session, message.getPayload());
		

		
	}
	private void broadcastMessage(WebSocketSession session, String payload) throws IOException {
		for(WebSocketSession session_aux : sessionList.values()) {
			if(!session_aux.getId().equals(session.getId())) {
				session_aux.sendMessage(new TextMessage(payload));
				
			}
		}
	}
}
