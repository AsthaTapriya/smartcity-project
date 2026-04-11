package smartcity.repositiory;
//import org.springframework.data.domain.Limit;
//import smartcity.model.Officer;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.stereotype.Repository;
//import java.util.List;
//
//@Repository
//public interface OfficerRepository extends JpaRepository<Officer, Integer> {
//    List<Officer> findByDepartment_Id(int departmentId);
//}

import smartcity.model.Officer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface OfficerRepository extends JpaRepository<Officer, Integer> {
    List<Officer> findByDepartmentId(int departmentId);
    Optional<Officer> findByUserId(int userId);
}
