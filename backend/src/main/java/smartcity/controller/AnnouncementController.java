//package smartcity.controller;
//
//import smartcity.model.Announcement;
//import smartcity.service.AnnouncementService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/announcements")
//@CrossOrigin(origins = "*")
//public class AnnouncementController {
//    @Autowired
//    private AnnouncementService announcementService;
//
//    @PostMapping("/add")
//    public ResponseEntity<Announcement>addAnnouncement(@RequestBody Announcement announcement){
//        return ResponseEntity.ok(announcementService.addAnnouncement(announcement));
//    }
//
//    @GetMapping("/all")
//    public ResponseEntity<List<Announcement>>getAllAnnouncements(){
//        return ResponseEntity.ok(announcementService.getAllAnnouncements());
//    }
//
//    @DeleteMapping("/delete{id}")
//    public ResponseEntity<?>deleteAnnouncement(@PathVariable int id){
//        announcementService.deleteAnnouncement(id);
//        return ResponseEntity.ok("Announcement deleted successfully!");
//    }
//}

package smartcity.controller;
import smartcity.model.Announcement;
import smartcity.service.AnnouncementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/announcements")
@CrossOrigin(origins = "*")
public class AnnouncementController {
    @Autowired
    private AnnouncementService announcementService;

    @PostMapping("/add")
    public ResponseEntity<Announcement> addAnnouncement(@RequestBody Announcement announcement) {
        return ResponseEntity.ok(announcementService.addAnnouncement(announcement));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Announcement>> getAllAnnouncements() {
        return ResponseEntity.ok(announcementService.getAllAnnouncements());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteAnnouncement(@PathVariable int id) {
        announcementService.deleteAnnouncement(id);
        return ResponseEntity.ok("Deleted!");
    }
}
