package com.student.studenttaskmanagement.entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "timetable")
public class Timetable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer timetableId;

    private String subjectName;
    private String day;
    private String startTime;
    private String endTime;

    @ManyToOne
    @JoinColumn(name = "student_id")
    @JsonBackReference("student-timetable") 
    private Student student;

    public Timetable() {}

    public Integer getTimetableId() { return timetableId; }
    public void setTimetableId(Integer timetableId) { this.timetableId = timetableId; }

    public String getSubjectName() { return subjectName; }
    public void setSubjectName(String subjectName) { this.subjectName = subjectName; }

    public String getDay() { return day; }
    public void setDay(String day) { this.day = day; }

    public String getStartTime() { return startTime; }
    public void setStartTime(String startTime) { this.startTime = startTime; }

    public String getEndTime() { return endTime; }
    public void setEndTime(String endTime) { this.endTime = endTime; }

    public Student getStudent() { return student; }
    public void setStudent(Student student) { this.student = student; }
}