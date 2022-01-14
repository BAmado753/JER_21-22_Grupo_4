package es.stormedia.TinyTussel;

import org.springframework.web.socket.WebSocketSession;

public class Sala {
private String sesionID;
private String sala;
private WebSocketSession sesion;
	public Sala() {
		
	}
	public Sala(String s, String sa, WebSocketSession ssn){
		this.sesionID=s;
		this.sala=sa;
		this.sesion=ssn;
	}
	public String getSesionID() {
		return sesionID;
	}
	public void setSesionID(String sesion) {
		this.sesionID = sesion;
	}
	public String getSala() {
		return sala;
	}
	public void setSala(String sala) {
		this.sala = sala;
	}
	public WebSocketSession getSesion() {
		return sesion;
	}
	public void setSesion(WebSocketSession sesion) {
		this.sesion = sesion;
	}
	
	
}
