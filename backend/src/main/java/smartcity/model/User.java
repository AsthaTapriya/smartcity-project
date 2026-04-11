//package smartcity.model;
//import jakarta.persistence.*;
//import lombok.Data;
//
//import javax.management.relation.Role;
//import java.time.LocalDateTime;
//
//@Data
//@Entity
//@Table(name = "users")
//public class User {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private int id;
//
//    private String user_name;
//    private String email;
//    private String user_pwd;
//    private String phone_no;
//
//    @Enumerated(EnumType.STRING)
//    private Role user_role;
//
//    private int is_active;
//    private LocalDateTime creation_date;
//
//    public enum Role{
//        citizen, officer, admin
//    }
//}

package smartcity.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Data
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String user_name;
    private String email;
    private String user_pwd;
    private String phone_no;
    @Enumerated(EnumType.STRING)
    private Role user_role;
    private int is_active = 1;
    private LocalDateTime creation_date;

    public enum Role {
        citizen, officer, admin
    }
}
