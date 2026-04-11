//package smartcity.model;
//
//import jakarta.persistence.*;
//import lombok.Data;
//
//import java.time.LocalDateTime;
//
//@Data
//@Entity
//@Table(name = "complaints")
//public class Complaint {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "comp_id")
//    private int id;
//
//    @ManyToOne
//    @JoinColumn(name = "comp_user_id")
//    private User user;
//
//    private String title;
//
//    @ManyToOne
//    @JoinColumn(name = "complaint_department_id")
//    private Department department;
//
//    private String message;
//    private String location;
//
//    @Enumerated(EnumType.STRING)
//    private Priority priority;
//
//    private String photo;
//
//    @Enumerated(EnumType.STRING)
//    @Column(name = "comp_status")
//    private Status compStatus;
//
//    @ManyToOne
//    @JoinColumn(name = "assigned_to")
//    private Officer assignedOfficer;
//
//    private LocalDateTime comp_creation;
//
//    public enum Priority{
//        high, medium, low
//    }
//
//    public enum Status{
//        filed, under_review, assigned, in_progress, resolved, closed
//    }
//}

package smartcity.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Data
@Entity
@Table(name = "complaints")
public class Complaint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comp_id")
    private int compId;

    @ManyToOne
    @JoinColumn(name = "comp_user_id")
    @JsonIgnoreProperties({"user_pwd"})
    private User user;

    private String title;

    @ManyToOne
    @JoinColumn(name = "complaint_department_id")
    private Department department;

    private String message;
    private String location;

    @Enumerated(EnumType.STRING)
    private Priority priority;

    private String photo;

    @Column(name = "comp_status")
    @Enumerated(EnumType.STRING)
    private Status compStatus;

    @ManyToOne
    @JoinColumn(name = "assigned_to")
    @JsonIgnoreProperties({"user_pwd"})
    private Officer assignedOfficer;

    @Column(name = "comp_creation")
    private LocalDateTime compCreation;

    public enum Priority { high, medium, low }
    public enum Status { filed, under_review, assigned, in_progress, resolved, closed }
}