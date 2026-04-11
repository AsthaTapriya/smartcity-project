//package smartcity.controller;
//
//import smartcity.model.Department;
//import smartcity.service.DepartmentService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/departments")
//@CrossOrigin(origins = "*")
//public class DepartmentController {
//    @Autowired
//    private DepartmentService departmentService;
//
//    @PostMapping("/add")
//    public ResponseEntity<Department> addDepartment(@RequestBody Department department){
//        return ResponseEntity.ok(departmentService.addDepartment(department));
//    }
//
//    @GetMapping("/all")
//    public ResponseEntity<List<Department>> getAllDepartments(){
//        return ResponseEntity.ok(departmentService.getAllDepartments());
//    }
//
//    @GetMapping("/{id}")
//    public ResponseEntity<Department>getDepartmentById(@PathVariable int id){
//        return departmentService.getDepartmentById(id)
//                .map(ResponseEntity::ok)
//                .orElse(ResponseEntity.notFound().build());
//
//    }
//
//    @DeleteMapping("/delete/{id}")
//    public ResponseEntity<?>deleteDepartment(@PathVariable int id){
//        departmentService.deleteDepartment(id);
//        return ResponseEntity.ok("Department deleted successfully!");
//    }
//
//    @PutMapping("/update")
//    public ResponseEntity<Department> updateDepartment(@RequestBody Department department) {
//        return ResponseEntity.ok(departmentService.addDepartment(department));
//    }
//}
package smartcity.controller;
import smartcity.model.Department;
import smartcity.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/departments")
@CrossOrigin(origins = "*")
public class DepartmentController {
    @Autowired
    private DepartmentService departmentService;

    @PostMapping("/add")
    public ResponseEntity<Department> addDepartment(@RequestBody Department department) {
        return ResponseEntity.ok(departmentService.addDepartment(department));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Department>> getAllDepartments() {
        return ResponseEntity.ok(departmentService.getAllDepartments());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Department> getDepartmentById(@PathVariable int id) {
        return departmentService.getDepartmentById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/update")
    public ResponseEntity<Department> updateDepartment(@RequestBody Department department) {
        return ResponseEntity.ok(departmentService.addDepartment(department));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteDepartment(@PathVariable int id) {
        departmentService.deleteDepartment(id);
        return ResponseEntity.ok("Deleted!");
    }
}