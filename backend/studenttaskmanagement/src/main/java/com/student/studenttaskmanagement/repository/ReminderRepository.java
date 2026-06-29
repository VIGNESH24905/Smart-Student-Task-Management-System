package com.student.studenttaskmanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.student.studenttaskmanagement.entity.Reminder;

public interface ReminderRepository extends JpaRepository<Reminder, Integer> {

}