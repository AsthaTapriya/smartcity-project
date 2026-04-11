package smartcity.service;

import smartcity.model.Feedback;
import smartcity.repositiory.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class FeedbackService {
    @Autowired
    private FeedbackRepository feedbackRepository;

    public Feedback addFeedback(Feedback feedback){
        feedback.setCreation_date(LocalDateTime.now());
        return feedbackRepository.save(feedback);
    }

    public List<Feedback> getFeedbackByComplaint(int complaintId){
        return feedbackRepository.findByComplaintCompId(complaintId);
    }
}
