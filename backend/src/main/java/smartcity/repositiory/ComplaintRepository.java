package smartcity.repositiory;

//import org.springframework.data.domain.Limit;
//import smartcity.model.Complaint;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.stereotype.Repository;
//import java.util.List;
//
//@Repository
//public interface ComplaintRepository extends JpaRepository<Complaint, Integer>{
//    List<Complaint> findByUser_Id(int userId);
//
//    List<Complaint> findByAssignedOfficer_Id(int assignedOfficerId);
//    List<Complaint> findByCompStatus(Complaint.Status status);
//}

import smartcity.model.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ComplaintRepository extends JpaRepository<Complaint, Integer> {
    List<Complaint> findByUserId(int userId);
    List<Complaint> findByAssignedOfficerId(int officerId);
    List<Complaint> findByCompStatus(Complaint.Status status);
}