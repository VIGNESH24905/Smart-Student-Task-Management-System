package com.student.studenttaskmanagement.controller;

import com.student.studenttaskmanagement.entity.Announcement;
import com.student.studenttaskmanagement.service.AnnouncementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/announcements")   
@CrossOrigin("*")
public class AnnouncementController {

    @Autowired
    private AnnouncementService announcementService;

    @PostMapping
    public ResponseEntity<Announcement> addAnnouncement(@RequestBody Announcement announcement) {
        return ResponseEntity.ok(announcementService.saveAnnouncement(announcement));
    }

    @GetMapping
    public ResponseEntity<List<Announcement>> getAllAnnouncements() {
        return ResponseEntity.ok(announcementService.getAllAnnouncements());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Announcement> getAnnouncementById(@PathVariable Integer id) {
        return ResponseEntity.ok(announcementService.getAnnouncementById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAnnouncement(@PathVariable Integer id) {
        announcementService.deleteAnnouncement(id);
        return ResponseEntity.ok("Announcement Deleted Successfully");
    }
}