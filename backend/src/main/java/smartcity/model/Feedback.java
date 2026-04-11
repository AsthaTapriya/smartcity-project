//package smartcity.model;
//import jakarta.persistence.*;
//import lombok.Data;
//
//import java.time.LocalDateTime;
//
//@Data
//@Entity
//@Table(name = "feedback")
//public class Feedback {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private int id;
//
//    @ManyToOne
//    @JoinColumn(name = "user_complaint_id")
//    private Complaint complaint;
//
//    @ManyToOne
//    @JoinColumn(name = "feedback_user_id")
//    private User feedbackUserId;
//
//    private int rating;
//    private String message;
//    private LocalDateTime creation_date;
//}

package smartcity.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Data
@Entity
@Table(name = "feedback")
public class Feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "user_complaint_id")
    @JsonIgnoreProperties({"user", "department", "assignedOfficer"})
    private Complaint complaint;

    @ManyToOne
    @JoinColumn(name = "feedback_user_id")
    @JsonIgnoreProperties({"user_pwd"})
    private User user;

    private int rating;
    private String message;
    private LocalDateTime creation_date;
}
