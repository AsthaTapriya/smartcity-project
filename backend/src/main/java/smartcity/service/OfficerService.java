package smartcity.service;

import smartcity.model.Officer;
import smartcity.repositiory.OfficerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class OfficerService {
    @Autowired
    private OfficerRepository officerRepository;

    public Officer addOfficer(Officer officer){
        return officerRepository.save(officer);
    }

    public List<Officer>getAllOfficers(){
        return officerRepository.findAll();
    }

    public Optional<Officer>getOfficerById(int id){
        return officerRepository.findById(id);
    }

    public Optional<Officer> getOfficerByUserId(int userId) { return officerRepository.findByUserId(userId); }

    public List<Officer>getOfficersByDepartment(int departmentId){
        return officerRepository.findByDepartmentId(departmentId);
    }

    public void deleteOfficer(int id){
        officerRepository.deleteById(id);
    }
}
