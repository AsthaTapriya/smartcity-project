//package smartcity.controller;
//
//import smartcity.model.Feedback;
//import smartcity.service.FeedbackService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/feedback")
//@CrossOrigin(origins = "*")
//public class FeedbackController {
//    @Autowired
//    private FeedbackService feedbackService;
//
//    @PostMapping("/add")
//    public ResponseEntity<Feedback>addFeedback(@RequestBody Feedback feedback){
//        return ResponseEntity.ok(feedbackService.addFeedback(feedback));
//    }
//
//    @GetMapping("/{complaintId}")
//    public ResponseEntity<List<Feedback>>getFeedbackByComplaint(@PathVariable int complaintId){
//        return ResponseEntity.ok(feedbackService.getFeedbackByComplaint(complaintId));
//    }
//}

package smartcity.controller;
import smartcity.model.Feedback;
import smartcity.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/feedback")
@CrossOrigin(origins = "*")
public class FeedbackController {
    @Autowired
    private FeedbackService feedbackService;

    @PostMapping("/add")
    public ResponseEntity<Feedback> addFeedback(@RequestBody Feedback feedback) {
        return ResponseEntity.ok(feedbackService.addFeedback(feedback));
    }

    @GetMapping("/{complaintId}")
    public ResponseEntity<List<Feedback>> getFeedback(@PathVariable int complaintId) {
        return ResponseEntity.ok(feedbackService.getFeedbackByComplaint(complaintId));
    }
}