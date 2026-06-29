package com.student.studenttaskmanagement.service;

import com.student.studenttaskmanagement.entity.Admin;
import com.student.studenttaskmanagement.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    public Admin saveAdmin(Admin admin) {
        return adminRepository.save(admin);
    }

    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    public Admin loginAdmin(String username, String password) {
        Admin admin = adminRepository.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("Admin not found"));
        if (admin.getPassword().equals(password)) {
            return admin;
        }
        throw new RuntimeException("Invalid password");
    }
}