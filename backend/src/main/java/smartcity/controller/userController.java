//package smartcity.controller;
//
//import smartcity.model.User;
//import smartcity.service.UserService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/users")
//@CrossOrigin(origins = "*")
//public class userController {
//    @Autowired
//    private UserService userService;
//
//    @PostMapping("/register")
//    public ResponseEntity<User>register(@RequestBody User user) {
//        return ResponseEntity.ok(userService.registerUser(user));
//    }
//    @PostMapping("/login")
//    public ResponseEntity<?>login(@RequestParam String email,
//                                  @RequestParam String password){
//        return userService.loginUser(email,password)
//                .map(ResponseEntity::ok)
//                .orElse(ResponseEntity.status(401).build());
//    }
//
//    @GetMapping("/all")
//    public ResponseEntity<List<User>> getAllUsers(){
//        return ResponseEntity.ok(userService.getAllUsers());
//    }
//
//    @GetMapping("/{id}")
//    public ResponseEntity<User>getUserById(@PathVariable int id){
//        return userService.getUserById(id)
//                .map(ResponseEntity::ok)
//                .orElse(ResponseEntity.notFound().build());
//    }
//
//    @GetMapping("/update")
//    public ResponseEntity<User> updateUser(@RequestBody User user){
//        return ResponseEntity.ok(userService.updateUser(user));
//    }
//
//    @DeleteMapping("/delete/{id}")
//    public ResponseEntity<?> deleteUser(@PathVariable int id){
//        userService.deleteUser(id);
//        return ResponseEntity.ok("User deleted successfully!");
//    }
//}

package smartcity.controller;
import smartcity.model.User;
import smartcity.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class userController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        return ResponseEntity.ok(userService.registerUser(user));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam String email, @RequestParam String password) {
        return userService.loginUser(email, password)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(401).build());
    }

    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable int id) {
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/update")
    public ResponseEntity<User> updateUser(@RequestBody User user) {
        return ResponseEntity.ok(userService.updateUser(user));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable int id) {
        userService.deleteUser(id);
        return ResponseEntity.ok("Deleted!");
    }
}