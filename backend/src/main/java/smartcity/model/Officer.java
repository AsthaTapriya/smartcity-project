//package smartcity.model;
//import jakarta.persistence.*;
//import lombok.Data;
//
//@Data
//@Entity
//@Table(name = "officers")
//public class Officer {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private int id;
//
//    @ManyToOne
//    @JoinColumn(name = "officer_id")
//    private User user;
//
//    @ManyToOne
//    @JoinColumn(name = "officer_dept_id")
//    private Department department;
//}

package smartcity.model;

import jakarta.persistence.*;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Data
@Entity
@Table(name = "officers")
public class Officer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "officer_id")
    @JsonIgnoreProperties({"user_pwd"})
    private User user;

    @ManyToOne
    @JoinColumn(name = "officer_dept_id")
    private Department department;
}