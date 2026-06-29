package com.student.studenttaskmanagement.repository;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.student.studenttaskmanagement.entity.Admin;

public interface AdminRepository extends JpaRepository<Admin, Integer> {
    Optional<Admin> findByUsername(String username);
}