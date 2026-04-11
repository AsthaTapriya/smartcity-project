//package smartcity.controller;
//
//import smartcity.model.ComplaintHistory;
//import smartcity.service.ComplaintHistoryService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/complaints_history")
//@CrossOrigin(origins = "*")
//public class ComplaintHistoryController {
//    @Autowired
//    private ComplaintHistoryService complaintHistoryService;
//
//    @PostMapping("/add")
//    public ResponseEntity<ComplaintHistory>addHistory(@RequestBody ComplaintHistory history){
//        return ResponseEntity.ok(complaintHistoryService.addHistory(history));
//    }
//
//    @GetMapping("/{complaintId}")
//    public ResponseEntity<List<ComplaintHistory>>getHistoryByComplaint(@PathVariable int complaintId){
//        return ResponseEntity.ok(complaintHistoryService.getHistoryByComplaint(complaintId));
//    }
//}

package smartcity.controller;
import smartcity.model.ComplaintHistory;
import smartcity.service.ComplaintHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/history")
@CrossOrigin(origins = "*")
public class ComplaintHistoryController {
    @Autowired
    private ComplaintHistoryService complaintHistoryService;

    @PostMapping("/add")
    public ResponseEntity<ComplaintHistory> addHistory(@RequestBody ComplaintHistory history) {
        return ResponseEntity.ok(complaintHistoryService.addHistory(history));
    }

    @GetMapping("/{complaintId}")
    public ResponseEntity<List<ComplaintHistory>> getHistory(@PathVariable int complaintId) {
        return ResponseEntity.ok(complaintHistoryService.getHistoryByComplaint(complaintId));
    }
}
