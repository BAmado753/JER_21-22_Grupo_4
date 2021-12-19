package es.stormedia.TinyTussel;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;


public class Player {
	private String name;
	private int id;
	private int maxPuntuacion;
	private String favChara;
	private int usosChilli;
	private int usosWasabi;
	private int usosBernie;
public Player() {
		
		
	}
	@JsonCreator
	public Player(@JsonProperty("name") String name,@JsonProperty("id")int id,@JsonProperty("maxPuntuacion") int mP,@JsonProperty("favChara")String fC,
			@JsonProperty("usosChilli")int uC, @JsonProperty("usosWasabi")int uW,@JsonProperty("usosBernie") int uB) {
		
		this.name=name;
		this.id=id;
		this.maxPuntuacion=mP;
		this.favChara=fC;
		this.usosChilli=uC;
		this.usosWasabi=uW;
		this.usosBernie=uB;
	}
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
	public int getMaxPuntuacion() {
		return maxPuntuacion;
	}

	public void setMaxPuntuacion(int maxPuntuacion) {
		this.maxPuntuacion = maxPuntuacion;
	}
	public String getFavChara() {
		return favChara;
	}
	public void setFavChara(String fC) {
		this.favChara=fC;
	}
	public int getUsosChilli() {
		return usosChilli;
	}
	public void setUsosChilli(int usosChilli) {
		this.usosChilli = usosChilli;
	}
	public int getUsosWasabi() {
		return usosWasabi;
	}
	public void setUsosWasabi(int usosWasabi) {
		this.usosWasabi = usosWasabi;
	}
	public int getUsosBernie() {
		return usosBernie;
	}
	public void setUsosBernie(int usosBernie) {
		this.usosBernie = usosBernie;
	}
}
