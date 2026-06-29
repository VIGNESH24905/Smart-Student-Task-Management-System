package com.student.studenttaskmanagement.repository;

import com.student.studenttaskmanagement.entity.Timetable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TimetableRepository extends JpaRepository<Timetable, Integer> {
   
    List<Timetable> findByStudent_StudentId(Integer studentId);
}