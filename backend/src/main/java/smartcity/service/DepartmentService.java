package smartcity.service;

import smartcity.model.Department;
import smartcity.repositiory.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class DepartmentService {
    @Autowired
    private DepartmentRepository departmentRepository;

    public Department addDepartment(Department department){
        return departmentRepository.save(department);
    }

    public List<Department>getAllDepartments(){
        return departmentRepository.findAll();
    }

    public Optional<Department>getDepartmentById(int id){
        return departmentRepository.findById(id);
    }

    public void deleteDepartment(int id){
        departmentRepository.deleteById(id);
    }
}
