package es.stormedia.TinyTussel;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

public class SelectPlayerHandler extends TextWebSocketHandler{
private Map<String, WebSocketSession> sessionList = new ConcurrentHashMap<>();
private Map<String, Sala> jgSalaList = new ConcurrentHashMap<>();
private boolean S1=true;
private boolean S2=true;
private boolean S3=true;
private boolean S4=true;

	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		sessionList.put(session.getId(), session);
		jgSalaList.put(session.getId(), new Sala(session.getId(),"sala-X",session));

	}
	
	
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		sessionList.remove(session.getId());
		jgSalaList.remove(session.getId());

	
	}
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		System.out.println((char)34+"Hola"+(char)34);
		String msg = message.getPayload();
		System.out.println("SPH MESSAGE: "+msg);
		if(msg.equals((char)34+"S1"+(char)34)) {
			System.out.println("SPH: Entra al S1");
			jgSalaList.get(session.getId()).setSala("sala-1");
			//Comunica al remitente su propio mensaje
			session.sendMessage(new TextMessage(msg));
			//Comunica a las demás sesiones el mensaje
			broadcastMessage(session, message.getPayload());		}
		else if(msg.equals((char)34+"S2"+(char)34)) {
			System.out.println("SPH: Entra al S2");
			jgSalaList.get(session.getId()).setSala("sala-2");
			//Comunica al remitente su propio mensaje
			session.sendMessage(new TextMessage(msg));
			//Comunica a las demás sesiones el mensaje
			broadcastMessage(session, message.getPayload());
		}
		else if(msg.equals((char)34+"S3"+(char)34)) {
			jgSalaList.get(session.getId()).setSala("sala-3");
			//Comunica al remitente su propio mensaje
			session.sendMessage(new TextMessage(msg));
			//Comunica a las demás sesiones el mensaje
			broadcastMessage(session, message.getPayload());
		}
		else if(msg.equals((char)34+"S4"+(char)34)){
			jgSalaList.get(session.getId()).setSala("sala-4");
			//Comunica al remitente su propio mensaje
			session.sendMessage(new TextMessage(msg));
			//Comunica a las demás sesiones el mensaje
			broadcastMessage(session, message.getPayload());
		}
		else if(msg.equals((char)34+"check"+(char)34)) {
			System.out.println("SPH: juja size: "+jgSalaList.size());

			if(jgSalaList.size()>0) {
				System.out.println("SPH: Entra al for juga ");

				for(Sala jugSala_aux : jgSalaList.values()) {
					if(!jugSala_aux.getSesionID().equals(session.getId())) {
						session.sendMessage(new TextMessage(jugSala_aux.getSala()));
					}
				}
			}
			
		}else {
			sendMessageInRoom(session, message.getPayload());	

		}/*
		else {
			///Comunica al remitente su propio mensaje
			session.sendMessage(new TextMessage(msg));
			//Comunica a las demás sesiones el mensaje
			broadcastMessage(session, message.getPayload());	
		}*/
	
		
	}
	private void broadcastMessage(WebSocketSession session, String payload) throws IOException {
		for(WebSocketSession session_aux : sessionList.values()) {
			if(!session_aux.getId().equals(session.getId())) {
				session_aux.sendMessage(new TextMessage(payload));
			}
		}
	}
	private void sendMessageInRoom(WebSocketSession session, String payload) throws IOException {
		String sala="null";
		for(Sala jugSala_aux : jgSalaList.values()) {
			if(jugSala_aux.getSesionID().equals(session.getId())) {
				sala=jugSala_aux.getSala();
			}
		}
		for(Sala jugSala_aux : jgSalaList.values()) {
			if(jugSala_aux.getSala().equals(sala)) {
				jugSala_aux.getSesion().sendMessage(new TextMessage(payload));
			}
		}
	}
}
