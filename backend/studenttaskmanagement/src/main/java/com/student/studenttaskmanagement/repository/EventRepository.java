package com.student.studenttaskmanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.student.studenttaskmanagement.entity.Event;

public interface EventRepository extends JpaRepository<Event, Integer> {

}