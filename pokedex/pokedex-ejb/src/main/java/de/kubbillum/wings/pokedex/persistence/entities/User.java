package de.kubbillum.wings.pokedex.persistence.entities;

import java.io.Serializable;
import java.security.Timestamp;
import java.util.Date;
import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import de.kubbillum.wings.pokedex.persistence.enums.Gender;

/**
 * Entity implementation class for Entity: User
 *
 */

@Entity
@NamedQuery(name = User.QUERY_GETALL, query = "SELECT c FROM User c")
public class User implements Serializable {
	
	public static final String QUERY_GETALL = "User.GetAll";

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

	@NotNull
	@Size(min = 1, max = 100)
	private String userName;

	@NotNull
	@Size(min = 1, max = 100)
	private String firstName;

	@NotNull
	@Size(min = 1, max = 100)
	private String lastName;

	@NotNull
	private Gender gender;

	private Date birthday;

	@OneToMany(cascade = CascadeType.ALL)
	private List<Pokemon> userPokedex;

	@Version
	private Timestamp lastChanged;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public Date getBirthday() {
		return birthday;
	}

	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}

	public User() {
		super();
	}

	public Gender getGender() {
		return gender;
	}

	public void setGender(Gender gender) {
		this.gender = gender;
	}

	public List<Pokemon> getUserPokedex() {
		return userPokedex;
	}

	public void setUserPokedex(List<Pokemon> userPokedex) {
		this.userPokedex = userPokedex;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}
}
