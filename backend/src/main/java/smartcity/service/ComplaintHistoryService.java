package smartcity.service;

import smartcity.model.ComplaintHistory;
import smartcity.repositiory.ComplaintHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ComplaintHistoryService {
    @Autowired
    private ComplaintHistoryRepository complaintHistoryRepository;

    public ComplaintHistory addHistory(ComplaintHistory history){
        history.setCreation_date(LocalDateTime.now());
        return complaintHistoryRepository.save(history);
    }

    public List<ComplaintHistory> getHistoryByComplaint(int complaintId){
        return complaintHistoryRepository.findByComplaintCompId(complaintId);
    }

}
