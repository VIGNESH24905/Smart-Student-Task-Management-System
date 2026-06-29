package com.student.studenttaskmanagement.repository;

import com.student.studenttaskmanagement.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Integer> {
   
    List<Task> findByStudent_StudentId(Integer studentId);
    List<Task> findByStatus(String status);
}