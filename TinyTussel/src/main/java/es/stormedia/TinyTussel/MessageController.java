package es.stormedia.TinyTussel;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.PrintStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MessageController {

	private ArrayList<String> messagesList = new ArrayList<>();
	//private int id;
	
	
	public void readAllMessages() throws FileNotFoundException {
		  File file = new File("mensajes.txt"); 
		    Scanner sc = new Scanner(file); 
		    while (sc.hasNextLine()) {
		    	messagesList.add(sc.nextLine());		
		    }
			if(messagesList.size()>4) {
				for(int j=0;j<5;j++) {
					String aux_last=messagesList.get(messagesList.size()-j-1);

					messagesList.set(j, aux_last);
				}
				
				}

	}
	
	@PostMapping("/messages")
	public void addMessage(@RequestBody Message message) throws FileNotFoundException {

		//message.setId(id);
		//playerList.add(player);

		try {
			PrintStream flujo;
			flujo = new PrintStream(new FileOutputStream("mensajes.txt", true));
			String fullMessage="["+message.getSender()+"] "+message.getMsg();
			flujo.println(fullMessage);
			flujo.close();

		} catch (Exception e) {
		//	e.printStackTrace();
		}
		

		//return message.getId();
	}
	@GetMapping("/messages/{id}")
	public String getMessage(@PathVariable int id) {
		messagesList.clear();
		try {
			readAllMessages();
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return messagesList.get(id);
		
	}
}
