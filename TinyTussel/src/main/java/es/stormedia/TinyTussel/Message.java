package es.stormedia.TinyTussel;
import org.springframework.stereotype.Component;




@Component
public class Message {
	//private int id;
	private String sender;
	private String msg;
	public Message() {}
	public Message(String mailer, String message) {
		
		this.sender=mailer;
		this.msg=message;
	}
	/*public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}*/
	public String getSender() {
		return sender;
	}

	public void setSender(String sender) {
		this.sender = sender;
	}
	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}
}
