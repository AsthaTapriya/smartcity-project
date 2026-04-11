//package smartcity.controller;
//
//import org.springframework.security.core.parameters.P;
//import smartcity.model.Officer;
//import smartcity.service.OfficerService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/officers")
//@CrossOrigin(origins = "*")
//public class OfficerController {
//    @Autowired
//    private OfficerService officerService;
//
//    @PostMapping("/add")
//    public ResponseEntity<Officer> addOfficer(@RequestBody Officer officer){
//        return ResponseEntity.ok(officerService.addOfficer(officer));
//    }
//
//    @GetMapping("/all")
//    public ResponseEntity<List<Officer>>getAllOfficers(){
//        return ResponseEntity.ok(officerService.getAllOfficers());
//    }
//
//    @GetMapping("/department/{departmentId}")
//    public ResponseEntity<List<Officer>>getOfficersByDepartment(@PathVariable int departmentId){
//        return ResponseEntity.ok(officerService.getOfficersByDepartment(departmentId));
//    }
//
//    @DeleteMapping("/delete/{id}")
//    public ResponseEntity<?>deleteOfficer(@PathVariable int id){
//        officerService.deleteOfficer(id);
//        return ResponseEntity.ok("Officer deleted successfully!");
//    }
//}

package smartcity.controller;
import smartcity.model.Officer;
import smartcity.service.OfficerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/officers")
@CrossOrigin(origins = "*")
public class OfficerController {
    @Autowired
    private OfficerService officerService;

    @PostMapping("/add")
    public ResponseEntity<Officer> addOfficer(@RequestBody Officer officer) {
        return ResponseEntity.ok(officerService.addOfficer(officer));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Officer>> getAllOfficers() {
        return ResponseEntity.ok(officerService.getAllOfficers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Officer> getOfficerById(@PathVariable int id) {
        return officerService.getOfficerById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Officer> getOfficerByUserId(@PathVariable int userId) {
        return officerService.getOfficerByUserId(userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteOfficer(@PathVariable int id) {
        officerService.deleteOfficer(id);
        return ResponseEntity.ok("Deleted!");
    }
}
