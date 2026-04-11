//package smartcity.model;
//
//import jakarta.persistence.*;
//import lombok.Data;
//
//@Data
//@Entity
//@Table(name = "department")
//public class Department {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private int id;
//    private String dept_name;
//    private int sla_days;
//}

package smartcity.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "department")
public class Department {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String dept_name;
    private int sla_days;
}