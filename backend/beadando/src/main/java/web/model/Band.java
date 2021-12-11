package web.model;

import javax.persistence.*;

@Entity
@Table(name = "bands")

public class Band {

    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name")
    private String name;

    @Column(name = "genre")
    private String genre;

    @Column(name = "formation_year")
    private String formationY;

    @Column(name = "memberNr")
    private String memberNr;

    public Band() {}

    public Band(String name, String genre, String formationY, String memberNr) {
        this.name = name;
        this.genre = genre;
        this.formationY = formationY;
        this.memberNr = memberNr;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getGenre() {
        return genre;
    }

    public void setYear(String formationY) {
        this.formationY = formationY;
    }

    public String getMember() {
        return memberNr;
    }

    public void setMember(String memberNr) {
        this.memberNr = memberNr;
    }

    public String getYear() {
        return formationY;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }
    
}
