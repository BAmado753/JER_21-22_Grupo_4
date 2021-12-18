package es.stormedia.TinyTussel;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.PrintStream;
import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
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
	public int addPlayer(@RequestBody Player player) throws FileNotFoundException {
		player.setId(id);
		playerList.add(player);
		id++;

		try {
			PrintStream flujo;
			flujo = new PrintStream(new FileOutputStream("jugadores.txt", true));

			flujo.println(player.getName());
			flujo.close();

		} catch (Exception e) {
			e.printStackTrace();
		}

		return player.getId();
	}
	
	@GetMapping("/player/name/{id}")
	public String getPlayerName(@PathVariable int id) {
		if (!playerList.isEmpty())
			for (int i = 0; i < playerList.size(); i++) {

				if (playerList.get(i).getId() == id) {
					return playerList.get(i).getName();
				}

			}

		return null;

	}
	
	
}
