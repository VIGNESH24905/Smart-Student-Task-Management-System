package com.student.studenttaskmanagement.service;

import com.student.studenttaskmanagement.entity.Timetable;
import com.student.studenttaskmanagement.repository.TimetableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TimetableService {

    @Autowired
    private TimetableRepository timetableRepository;

    public Timetable saveTimetable(Timetable timetable) {
        return timetableRepository.save(timetable);
    }

    public List<Timetable> getAllTimetables() {
        return timetableRepository.findAll();
    }

    public Timetable getTimetableById(Integer id) {
        return timetableRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Timetable not found with id: " + id));
    }

    public void deleteTimetable(Integer id) {
        timetableRepository.deleteById(id);
    }

    public List<Timetable> getTimetablesByStudentId(Integer studentId) {
        return timetableRepository.findByStudent_StudentId(studentId);
    }
}