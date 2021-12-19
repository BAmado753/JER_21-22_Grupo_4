package es.stormedia.TinyTussel;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintStream;
import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.exc.StreamReadException;
import com.fasterxml.jackson.core.exc.StreamWriteException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DatabindException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class PlayerController {
	@Autowired private Player player;
	private List<Player> playerList = new ArrayList<>();
	
	private List<String> playerNames = new ArrayList<>();
	private int id;
	private void readNames() {
		if (!playerList.isEmpty())
			for (int i = 0; i < playerList.size(); i++) {

				playerNames.add(playerList.get(i).getName());

			}

	}
	
	@GetMapping("/player")
	public List<String> players() {

		playerNames.clear();

		readNames();

		return playerNames;
	}
	
	@PostMapping("/player")
	public int addPlayer(@RequestBody Player player) {
		player.setId(id);
		//playerList.add(player);
		id++;
			ObjectMapper mapper= new ObjectMapper();
			try {
				mapper.writeValue(new File("player"+player.getId()+".json"), player);
			} catch (StreamWriteException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (DatabindException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		

		return player.getId();
	}
	
	@GetMapping("/player/name/{id}")
	public String getPlayerName(@PathVariable int id) {
		
		try {
			ObjectMapper mapper= new ObjectMapper();
			InputStream inputStream = new FileInputStream (new File("player"+id+".json"));
			//System.out.println(inputStream);
			TypeReference<Player> typeReference= new TypeReference<Player>() {};
			try {
				playerList.add( mapper.readValue(inputStream, typeReference));
				inputStream.close();
			} catch (StreamReadException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (DatabindException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		if (!playerList.isEmpty())
			for (Player p: playerList) {

				if (p.getId() == id) {
					return p.getName();
				}

			}

		return null;

	}
	@GetMapping("/player/maxPuntuacion/{id}")
	public int getMaxPuntuacion(@PathVariable int id) {
		
		try {
			ObjectMapper mapper= new ObjectMapper();
			InputStream inputStream = new FileInputStream (new File("player"+id+".json"));
			//System.out.println(inputStream);
			TypeReference<Player> typeReference= new TypeReference<Player>() {};
			try {
				playerList.add( mapper.readValue(inputStream, typeReference));
				inputStream.close();
			} catch (StreamReadException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (DatabindException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		if (!playerList.isEmpty())
			for (Player p: playerList) {

				if (p.getId() == id) {
					return p.getMaxPuntuacion();
				}

			}

		return 0;

	}
	
	@PutMapping("/player/name/{id}")
	public String actualizaNombre (@PathVariable int id , @RequestBody String newName ){

		try {
			ObjectMapper mapper= new ObjectMapper();
			InputStream inputStream = new FileInputStream (new File("player"+id+".json"));
			//System.out.println(inputStream);
			TypeReference<Player> typeReference= new TypeReference<Player>() {};
			try {
				Player player= mapper.readValue(inputStream, typeReference);
				inputStream.close();
			} catch (StreamReadException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (DatabindException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			player.setName(newName);
			try {
				mapper.writeValue(new File("player"+id+".json"), player);
			} catch (StreamWriteException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (DatabindException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
					return player.getName();
				

		}
}
