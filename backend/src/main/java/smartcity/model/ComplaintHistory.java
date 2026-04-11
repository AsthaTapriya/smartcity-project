//package smartcity.model;
//import jakarta.persistence.*;
//import lombok.Data;
//
//import java.time.LocalDateTime;
//
//@Data
//@Entity
//@Table(name = "complaints_history")
//public class ComplaintHistory {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private int id;
//
//    @ManyToOne
//    @JoinColumn(name = "complaint_id")
//    private Complaint complaint;
//
//    private String old_status;
//    private String new_status;
//
//    @ManyToOne
//    @JoinColumn(name = "changed_by")
//    private User changedBy;
//
//    private String remark;
//    private LocalDateTime creation_date;
//}

package smartcity.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Data
@Entity
@Table(name = "complaints_history")
public class ComplaintHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "complaint_id")
    @JsonIgnoreProperties({"user", "department", "assignedOfficer"})
    private Complaint complaint;

    private String old_status;
    private String new_status;

    @ManyToOne
    @JoinColumn(name = "changed_by")
    @JsonIgnoreProperties({"user_pwd"})
    private User changedBy;

    private String remark;
    private LocalDateTime creation_date;
}
