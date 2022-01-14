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
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

@RestController
public class PlayerController {
	@Autowired private Player player;
	
	private int id;
	
	@PostMapping("/player")
	public int addPlayer(@RequestBody Player player) {
		//player.setId(id);
		//playerList.add(player);
		System.out.println("en add player: "+ player.getId());
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
/////NAME//////////////
	@GetMapping("/player/name/{id}")
	public String getPlayerName(@PathVariable int id) {
		Player player_aux = null;
		try {
			ObjectMapper mapper= new ObjectMapper();
			InputStream inputStream = new FileInputStream (new File("player"+id+".json"));
			//System.out.println(inputStream);
			TypeReference<Player> typeReference= new TypeReference<Player>() {};
			try {
				player_aux= mapper.readValue(inputStream, typeReference);
				//playerList.add( mapper.readValue(inputStream, typeReference));
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
		
		return player_aux.getName();
	}
	
	@PutMapping("/player/name/{id}")
	public String actualizaNombre (@PathVariable int id , @RequestBody String newName ){
		Player player_aux = null;
		newName=newName.substring(newName.indexOf(":") + 2, newName.indexOf("}")-1);
		try {
			ObjectMapper mapper= new ObjectMapper();
			InputStream inputStream = new FileInputStream (new File("player"+id+".json"));
			//System.out.println(inputStream);
			TypeReference<Player> typeReference= new TypeReference<Player>() {};
			try {
				 player_aux= mapper.readValue(inputStream, typeReference);
				inputStream.close();
			} catch (StreamReadException e) {
				// TODO Auto-generated catch block
			//	e.printStackTrace();
			} catch (DatabindException e) {
				// TODO Auto-generated catch block
				//e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				//e.printStackTrace();
			}
			player_aux.setName(newName);
			try {
				mapper.writeValue(new File("player"+id+".json"), player_aux);
			} catch (StreamWriteException e) {
				// TODO Auto-generated catch block
			//	e.printStackTrace();
			} catch (DatabindException e) {
				// TODO Auto-generated catch block
				//e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
			//	e.printStackTrace();
			}
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			//e.printStackTrace();
		}
		
					return player_aux.getName();		
		}
	
/////PUNTUACION////////////////////////////////////////////////////////////////////
	@GetMapping("/player/maxpuntuacion/{id}")
	public int getMaxPuntuacion(@PathVariable int id) {
		Player player_aux = null;
		try {
			ObjectMapper mapper= new ObjectMapper();
			InputStream inputStream = new FileInputStream (new File("player"+id+".json"));
			//System.out.println(inputStream);
			TypeReference<Player> typeReference= new TypeReference<Player>() {};
			try {
				player_aux= mapper.readValue(inputStream, typeReference);
				//playerList.add( mapper.readValue(inputStream, typeReference));
				inputStream.close();
			} catch (StreamReadException e) {
				// TODO Auto-generated catch block
			//	e.printStackTrace();
			} catch (DatabindException e) {
				// TODO Auto-generated catch block
			//	e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				//e.printStackTrace();
			}
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
		//	e.printStackTrace();
		}
		return player_aux.getMaxPuntuacion();

	}

	
	@PutMapping("/player/maxpuntuacion/{id}")
	public int actualizaPuntuación (@PathVariable int id , @RequestBody String newScore ){
		System.out.println(newScore);
		Player player_aux = null;
		newScore=newScore.substring(newScore.indexOf(":") + 2, newScore.indexOf("}")-1);
		try {
			ObjectMapper mapper= new ObjectMapper();
			InputStream inputStream = new FileInputStream (new File("player"+id+".json"));
			//System.out.println(inputStream);
			TypeReference<Player> typeReference= new TypeReference<Player>() {};
			try {
				 player_aux= mapper.readValue(inputStream, typeReference);
				inputStream.close();
			} catch (StreamReadException e) {
				// TODO Auto-generated catch block
				//e.printStackTrace();
			} catch (DatabindException e) {
				// TODO Auto-generated catch block
				//e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				//e.printStackTrace();
			}
			player_aux.setMaxPuntuacion(Integer.parseInt(newScore));
			try {
				mapper.writeValue(new File("player"+id+".json"), player_aux);
			} catch (StreamWriteException e) {
				// TODO Auto-generated catch block
			//	e.printStackTrace();
			} catch (DatabindException e) {
				// TODO Auto-generated catch block
			//	e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				//e.printStackTrace();
			}
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			//e.printStackTrace();
		}
		
					return player_aux.getMaxPuntuacion();		
		}
	
///////PERSONAJE FAV//////////////////////////////////////////////////////////////////////
	@GetMapping("/player/pjfav/{id}")
	public String getPlayerFav(@PathVariable int id) {
		Player player_aux = null;
		try {
			ObjectMapper mapper= new ObjectMapper();
			InputStream inputStream = new FileInputStream (new File("player"+id+".json"));
			//System.out.println(inputStream);
			TypeReference<Player> typeReference= new TypeReference<Player>() {};
			try {
				player_aux= mapper.readValue(inputStream, typeReference);
				//playerList.add( mapper.readValue(inputStream, typeReference));
				inputStream.close();
			} catch (StreamReadException e) {
				// TODO Auto-generated catch block
			//	e.printStackTrace();
			} catch (DatabindException e) {
				// TODO Auto-generated catch block
				//e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
			//	e.printStackTrace();
			}
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
		//	e.printStackTrace();
		}
		return player_aux.getFavChara();
	}
	
	@PutMapping("/player/pjfav/{id}")
	public String actualizaPjFav (@PathVariable int id , @RequestBody String newPjFav ){
		Player player_aux = null;
		newPjFav=newPjFav.substring(newPjFav.indexOf(":") + 2, newPjFav.indexOf("}")-1);
		try {
			ObjectMapper mapper= new ObjectMapper();
			InputStream inputStream = new FileInputStream (new File("player"+id+".json"));
			//System.out.println(inputStream);
			TypeReference<Player> typeReference= new TypeReference<Player>() {};
			try {
				 player_aux= mapper.readValue(inputStream, typeReference);
				inputStream.close();
			} catch (StreamReadException e) {
				// TODO Auto-generated catch block
			//	e.printStackTrace();
			} catch (DatabindException e) {
				// TODO Auto-generated catch block
			//	e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
			//	e.printStackTrace();
			}
			player_aux.setFavChara(newPjFav);
			try {
				mapper.writeValue(new File("player"+id+".json"), player_aux);
			} catch (StreamWriteException e) {
				// TODO Auto-generated catch block
			//	e.printStackTrace();
			} catch (DatabindException e) {
				// TODO Auto-generated catch block
			//	e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
			//	e.printStackTrace();
			}
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
		//	e.printStackTrace();
		}
		
					return player_aux.getFavChara();		
		}
	
/////////////////USOS CHILLI/////////////////////////////
	@GetMapping("/player/usoschilli/{id}")
	public int getUsosChilli(@PathVariable int id) {
		Player player_aux = null;
		try {
			ObjectMapper mapper= new ObjectMapper();
			InputStream inputStream = new FileInputStream (new File("player"+id+".json"));
			//System.out.println(inputStream);
			TypeReference<Player> typeReference= new TypeReference<Player>() {};
			try {
				player_aux= mapper.readValue(inputStream, typeReference);
				//playerList.add( mapper.readValue(inputStream, typeReference));
				inputStream.close();
			} catch (StreamReadException e) {
				// TODO Auto-generated catch block
			//	e.printStackTrace();
			} catch (DatabindException e) {
				// TODO Auto-generated catch block
			//	e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
			//	e.printStackTrace();
			}
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
		//	e.printStackTrace();
		}
		return player_aux.getUsosChilli();
	}
	
	@PutMapping("/player/usoschilli/{id}")
	public int actualizaUsosChilli (@PathVariable int id , @RequestBody String newUsos ){
		Player player_aux = null;
		newUsos=newUsos.substring(newUsos.indexOf(":") + 2, newUsos.indexOf("}")-1);
		try {
			ObjectMapper mapper= new ObjectMapper();
			InputStream inputStream = new FileInputStream (new File("player"+id+".json"));
			//System.out.println(inputStream);
			TypeReference<Player> typeReference= new TypeReference<Player>() {};
			try {
				 player_aux= mapper.readValue(inputStream, typeReference);
				inputStream.close();
			} catch (StreamReadException e) {
				// TODO Auto-generated catch block
			//	e.printStackTrace();
			} catch (DatabindException e) {
				// TODO Auto-generated catch block
			////	e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			player_aux.setUsosChilli(Integer.parseInt(newUsos));
			try {
				mapper.writeValue(new File("player"+id+".json"), player_aux);
			} catch (StreamWriteException e) {
				// TODO Auto-generated catch block
			////	e.printStackTrace();
			} catch (DatabindException e) {
				// TODO Auto-generated catch block
			//	e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
			//	e.printStackTrace();
			}
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
		//	e.printStackTrace();
		}
		
					return player_aux.getUsosChilli();		
		}
////////////////USOS WASABI/////////////////////////////
	@GetMapping("/player/usoswasabi/{id}")
	public int getUsosWasabi(@PathVariable int id) {
		Player player_aux = null;
		try {
			ObjectMapper mapper= new ObjectMapper();
			InputStream inputStream = new FileInputStream (new File("player"+id+".json"));
			//System.out.println(inputStream);
			TypeReference<Player> typeReference= new TypeReference<Player>() {};
			try {
				player_aux= mapper.readValue(inputStream, typeReference);
				//playerList.add( mapper.readValue(inputStream, typeReference));
				inputStream.close();
			} catch (StreamReadException e) {
				// TODO Auto-generated catch block
			//	e.printStackTrace();
			} catch (DatabindException e) {
				// TODO Auto-generated catch block
			//	e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
			////	e.printStackTrace();
			}
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
		//	e.printStackTrace();
		}
		return player_aux.getUsosChilli();
	}
	
	@PutMapping("/player/usoswasabi/{id}")
	public int actualizaUsosWasabi (@PathVariable int id , @RequestBody String newUsos ){
		Player player_aux = null;
		newUsos=newUsos.substring(newUsos.indexOf(":") + 2, newUsos.indexOf("}")-1);
		try {
			ObjectMapper mapper= new ObjectMapper();
			InputStream inputStream = new FileInputStream (new File("player"+id+".json"));
			//System.out.println(inputStream);
			TypeReference<Player> typeReference= new TypeReference<Player>() {};
			try {
				 player_aux= mapper.readValue(inputStream, typeReference);
				inputStream.close();
			} catch (StreamReadException e) {
				// TODO Auto-generated catch block
			//	e.printStackTrace();
			} catch (DatabindException e) {
				// TODO Auto-generated catch block
			//	e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
			//	e.printStackTrace();
			}
			player_aux.setUsosWasabi(Integer.parseInt(newUsos));
			try {
				mapper.writeValue(new File("player"+id+".json"), player_aux);
			} catch (StreamWriteException e) {
				// TODO Auto-generated catch block
			//	e.printStackTrace();
			} catch (DatabindException e) {
				// TODO Auto-generated catch block
			//	e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
			//	e.printStackTrace();
			}
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
		//	e.printStackTrace();
		}
		
					return player_aux.getUsosWasabi();		
		}
///////////////USOS BERNIE//////////////////////////////////
	@GetMapping("/player/usosbernie/{id}")
	public int getUsosBernie(@PathVariable int id) {
		Player player_aux = null;
		try {
			ObjectMapper mapper= new ObjectMapper();
			InputStream inputStream = new FileInputStream (new File("player"+id+".json"));
			//System.out.println(inputStream);
			TypeReference<Player> typeReference= new TypeReference<Player>() {};
			try {
				player_aux= mapper.readValue(inputStream, typeReference);
				//playerList.add( mapper.readValue(inputStream, typeReference));
				inputStream.close();
			} catch (StreamReadException e) {
				// TODO Auto-generated catch block
			//	e.printStackTrace();
			} catch (DatabindException e) {
				// TODO Auto-generated catch block
			//	e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
			///	e.printStackTrace();
			}
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			//e.printStackTrace();
		}
		return player_aux.getUsosBernie();
	}
	
	@PutMapping("/player/usosbernie/{id}")
	public int actualizaUsosBernie (@PathVariable int id , @RequestBody String newUsos ){
		Player player_aux = null;
		newUsos=newUsos.substring(newUsos.indexOf(":") + 2, newUsos.indexOf("}")-1);
		try {
			ObjectMapper mapper= new ObjectMapper();
			InputStream inputStream = new FileInputStream (new File("player"+id+".json"));
			//System.out.println(inputStream);
			TypeReference<Player> typeReference= new TypeReference<Player>() {};
			try {
				 player_aux= mapper.readValue(inputStream, typeReference);
				inputStream.close();
			} catch (StreamReadException e) {
				// TODO Auto-generated catch block
			//	e.printStackTrace();
			} catch (DatabindException e) {
				// TODO Auto-generated catch block
			//	e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
			//	e.printStackTrace();
			}
			player_aux.setUsosChilli(Integer.parseInt(newUsos));
			try {
				mapper.writeValue(new File("player"+id+".json"), player_aux);
			} catch (StreamWriteException e) {
				// TODO Auto-generated catch block
			//	e.printStackTrace();
			} catch (DatabindException e) {
				// TODO Auto-generated catch block
			//	e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
			//	e.printStackTrace();
			}
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
		//	e.printStackTrace();
		}
		
					return player_aux.getUsosChilli();		
		}
/////DELETE/////////////////////////////////
	@DeleteMapping("/player/{id}")
	public void deleteProfile(@PathVariable int id) {
		File myObj = new File("player"+id+".json");
		myObj.delete();
		}
	
}
