package smartcity.service;

import smartcity.model.User;
import smartcity.repositiory.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User registerUser(User user){
        return userRepository.save(user);
    }

    public Optional<User> loginUser(String email, String password){
        Optional<User> user = userRepository.findByEmail(email);
        if(user.isPresent() && user.get().getUser_pwd().equals(password)){
            return user;
        }
        return Optional.empty();
    }

    public List<User>getAllUsers(){
        return userRepository.findAll();
    }

    public Optional<User> getUserById(int id){
        return userRepository.findById(id);
    }

    public User updateUser(User user){
        return userRepository.save(user);
    }

    public void deleteUser(int id){
        userRepository.deleteById(id);
    }
}
