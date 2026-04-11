//package smartcity.model;
//import jakarta.persistence.*;
//import lombok.Data;
//
//import java.time.LocalDateTime;
//
//@Data
//@Entity
//@Table(name = "announcements")
//public class Announcement {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private int id;
//
//    private String title;
//    private String msg;
//
//    @ManyToOne
//    @JoinColumn(name = "announce_user")
//    private User announceUser;
//
//    private LocalDateTime creation_date;
//}

package smartcity.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Data
@Entity
@Table(name = "announcements")
public class Announcement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String title;
    private String msg;

    @ManyToOne
    @JoinColumn(name = "announce_user")
    @JsonIgnoreProperties({"user_pwd"})
    private User announceUser;

    private LocalDateTime creation_date;
}