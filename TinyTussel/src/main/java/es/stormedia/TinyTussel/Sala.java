package es.stormedia.TinyTussel;

public class Sala {
private String sesion;
private String sala;
	public Sala() {
		
	}
	public Sala(String s, String sa){
		this.sesion=s;
		this.sala=sa;
	}
	public String getSesion() {
		return sesion;
	}
	public void setSesion(String sesion) {
		this.sesion = sesion;
	}
	public String getSala() {
		return sala;
	}
	public void setSala(String sala) {
		this.sala = sala;
	}
	
	
}
