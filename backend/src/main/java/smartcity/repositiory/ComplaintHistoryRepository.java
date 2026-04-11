package smartcity.repositiory;

//import smartcity.model.ComplaintHistory;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.stereotype.Repository;
//import java.util.List;
//
//@Repository
//public interface ComplaintHistoryRepository extends JpaRepository<ComplaintHistory, Integer>{
//    List<ComplaintHistory>findByComplaintId(int complaintId);
//}

import smartcity.model.ComplaintHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ComplaintHistoryRepository extends JpaRepository<ComplaintHistory, Integer> {
    List<ComplaintHistory> findByComplaintCompId(int compId);
}
