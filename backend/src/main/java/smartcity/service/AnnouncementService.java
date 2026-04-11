package smartcity.service;

import smartcity.model.Announcement;
import smartcity.repositiory.AnnouncementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class AnnouncementService {
    @Autowired
    private AnnouncementRepository announcementRepository;

    public Announcement addAnnouncement(Announcement announcement){
        announcement.setCreation_date(LocalDateTime.now());
        return announcementRepository.save(announcement);
    }

    public List<Announcement> getAllAnnouncements(){
        return announcementRepository.findAll();
    }

    public void deleteAnnouncement(int id){
        announcementRepository.deleteById(id);
    }
}
