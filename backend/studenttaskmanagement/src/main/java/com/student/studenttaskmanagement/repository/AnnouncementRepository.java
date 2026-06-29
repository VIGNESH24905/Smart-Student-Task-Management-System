package com.student.studenttaskmanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.student.studenttaskmanagement.entity.Announcement;

public interface AnnouncementRepository extends JpaRepository<Announcement, Integer> {

}