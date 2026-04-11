package smartcity.repositiory;

//import smartcity.model.Feedback;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.stereotype.Repository;
//import java.util.List;
//
//@Repository
//public interface FeedbackRepository extends JpaRepository<Feedback, Integer>{
//    List<Feedback> findByComplaintId(int complaintId);
//}

import smartcity.model.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Integer> {
    List<Feedback> findByComplaintCompId(int complaintId);
}
