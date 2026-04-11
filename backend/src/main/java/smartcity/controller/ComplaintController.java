//package smartcity.controller;
//
//import smartcity.model.Complaint;
//import smartcity.service.ComplaintService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/complaints")
//@CrossOrigin(origins = "*")
//public class ComplaintController {
//    @Autowired
//    private ComplaintService complaintService;
//
//    @PostMapping("/file")
//    public ResponseEntity<Complaint> fileComplaint(@RequestBody Complaint complaint){
//        return ResponseEntity.ok(complaintService.fileComplaint(complaint));
//    }
//
//    @GetMapping("/all")
//    public ResponseEntity<List<Complaint>>getAllComplaints(){
//        return ResponseEntity.ok(complaintService.getAllComplaints());
//    }
//
//    @GetMapping("user/{userId}")
//    public ResponseEntity<List<Complaint>>getComplaintByUser(@PathVariable int userId){
//        return ResponseEntity.ok(complaintService.getComplaintsByUser(userId));
//    }
//
//    @GetMapping("/{id}")
//    public ResponseEntity<Complaint>getComplaintById(@PathVariable int id){
//        return complaintService.getComplaintById(id)
//                .map(ResponseEntity::ok)
//                .orElse(ResponseEntity.notFound().build());
//    }
//
//    @PutMapping("/update")
//    public ResponseEntity<Complaint>updateComplaint(@RequestBody Complaint complaint){
//        return ResponseEntity.ok(complaintService.updateComplaint(complaint));
//    }
//
//    @DeleteMapping("/delete/{id}")
//    public ResponseEntity<?>deleteComplaint(@PathVariable int id){
//        complaintService.deleteComplaint(id);
//        return ResponseEntity.ok("Complaint deleted successfully!");
//    }
//}

package smartcity.controller;
import smartcity.model.Complaint;
import smartcity.service.ComplaintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/complaints")
@CrossOrigin(origins = "*")
public class ComplaintController {
    @Autowired
    private ComplaintService complaintService;

    @PostMapping("/file")
    public ResponseEntity<Complaint> fileComplaint(@RequestBody Complaint complaint) {
        return ResponseEntity.ok(complaintService.fileComplaint(complaint));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Complaint>> getAllComplaints() {
        return ResponseEntity.ok(complaintService.getAllComplaints());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Complaint> getComplaintById(@PathVariable int id) {
        return complaintService.getComplaintById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Complaint>> getComplaintsByUser(@PathVariable int userId) {
        return ResponseEntity.ok(complaintService.getComplaintsByUser(userId));
    }

    @GetMapping("/officer/{officerId}")
    public ResponseEntity<List<Complaint>> getComplaintsByOfficer(@PathVariable int officerId) {
        return ResponseEntity.ok(complaintService.getComplaintByOfficer(officerId));
    }

    @PutMapping("/update")
    public ResponseEntity<Complaint> updateComplaint(@RequestBody Complaint complaint) {
        return ResponseEntity.ok(complaintService.updateComplaint(complaint));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteComplaint(@PathVariable int id) {
        complaintService.deleteComplaint(id);
        return ResponseEntity.ok("Deleted!");
    }
}
