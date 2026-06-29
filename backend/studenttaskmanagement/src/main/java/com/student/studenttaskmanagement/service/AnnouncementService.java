package com.student.studenttaskmanagement.service;

import com.student.studenttaskmanagement.entity.Announcement;
import com.student.studenttaskmanagement.entity.Student;
import com.student.studenttaskmanagement.repository.AnnouncementRepository;
import com.student.studenttaskmanagement.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AnnouncementService {

    @Autowired
    private AnnouncementRepository announcementRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private EmailService emailService; // ✅ Add this

    public Announcement saveAnnouncement(Announcement announcement) {
        Announcement saved = announcementRepository.save(announcement);

        // ✅ Send email to ALL students
        try {
            List<Student> allStudents = studentRepository.findAll();
            for (Student student : allStudents) {
                emailService.sendAnnouncementEmail(
                    student.getEmail(),
                    student.getName(),
                    saved.getTitle(),
                    saved.getDescription()
                );
            }
            System.out.println("Announcement emails sent to "
                + allStudents.size() + " students");
        } catch (Exception e) {
            System.err.println("Announcement email failed: " + e.getMessage());
        }

        return saved;
    }

    public List<Announcement> getAllAnnouncements() {
        return announcementRepository.findAll();
    }

    public Announcement getAnnouncementById(Integer id) {
        return announcementRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Announcement not found: " + id));
    }

    public void deleteAnnouncement(Integer id) {
        announcementRepository.deleteById(id);
    }
}