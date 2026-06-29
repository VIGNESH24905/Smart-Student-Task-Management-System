package com.student.studenttaskmanagement.controller;

import com.student.studenttaskmanagement.entity.Timetable;
import com.student.studenttaskmanagement.service.TimetableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/timetables") 
@CrossOrigin("*")
public class TimetableController {

    @Autowired
    private TimetableService timetableService;

    @PostMapping
    public ResponseEntity<Timetable> addTimetable(@RequestBody Timetable timetable) {
        return ResponseEntity.ok(timetableService.saveTimetable(timetable));
    }

    @GetMapping
    public ResponseEntity<List<Timetable>> getAllTimetables() {
        return ResponseEntity.ok(timetableService.getAllTimetables());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Timetable> getTimetableById(@PathVariable Integer id) {
        return ResponseEntity.ok(timetableService.getTimetableById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTimetable(@PathVariable Integer id) {
        timetableService.deleteTimetable(id);
        return ResponseEntity.ok("Timetable Deleted Successfully");
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Timetable>> getTimetablesByStudent(@PathVariable Integer studentId) {
        return ResponseEntity.ok(timetableService.getTimetablesByStudentId(studentId));
    }
}