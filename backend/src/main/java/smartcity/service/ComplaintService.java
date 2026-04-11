package smartcity.service;

import smartcity.model.Complaint;
import smartcity.model.ComplaintHistory;
import smartcity.repositiory.ComplaintHistoryRepository;
import smartcity.repositiory.ComplaintRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ComplaintService {
    @Autowired
    private ComplaintRepository complaintRepository;

    @Autowired
    private ComplaintHistoryRepository complaintHistoryRepository;

    public Complaint fileComplaint(Complaint complaint){
        complaint.setCompStatus(Complaint.Status.filed);
        complaint.setCompCreation(LocalDateTime.now());
        Complaint saved = complaintRepository.save(complaint);

        ComplaintHistory history = new ComplaintHistory();
        history.setComplaint(saved);
        history.setOld_status("none");
        history.setNew_status("filed");
        history.setRemark("Complaint filed by citizen");
        history.setCreation_date(LocalDateTime.now());
        complaintHistoryRepository.save(history);

        return saved;
    }


    public List<Complaint> getAllComplaints(){
        return complaintRepository.findAll();
    }

    public List<Complaint> getComplaintsByUser(int userId){
        return complaintRepository.findByUserId(userId);
    }

    public List<Complaint>getComplaintByOfficer(int officerId){
        return complaintRepository.findByAssignedOfficerId(officerId);
    }

    public List<Complaint>getComplaintsByStatus(Complaint.Status status){
        return complaintRepository.findByCompStatus(status);
    }

    public Optional<Complaint>getComplaintById(int id){
        return complaintRepository.findById(id);
    }

    public Complaint updateComplaint(Complaint complaint){
        return complaintRepository.save(complaint);
    }

    public void deleteComplaint(int id){
        complaintRepository.deleteById(id);
    }
}