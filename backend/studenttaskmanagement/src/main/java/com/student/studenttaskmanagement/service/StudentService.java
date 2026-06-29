package com.student.studenttaskmanagement.service;

import com.student.studenttaskmanagement.entity.Student;
import com.student.studenttaskmanagement.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private EmailService emailService; // ✅ Add this

    public Student saveStudent(Student student) {
        // Check duplicate email
        if (studentRepository.findByEmail(student.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered!");
        }
        Student saved = studentRepository.save(student);

        // ✅ Send welcome email after registration
        try {
            emailService.sendWelcomeEmail(
                    saved.getEmail(),
                    saved.getName());
        } catch (Exception e) {
            System.err.println("Welcome email failed: " + e.getMessage());
        }

        return saved;
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Student getStudentById(Integer id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found: " + id));
    }

    public void deleteStudent(Integer id) {
        studentRepository.deleteById(id);
    }

    public Student loginStudent(String email, String password) {
        Student student = studentRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        if (student.getPassword().equals(password)) {
            return student;
        }
        throw new RuntimeException("Invalid password");
    }

    public Student updateStudent(Integer id, Student updatedStudent) {
        Student existing = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found: " + id));
        existing.setName(updatedStudent.getName());
        existing.setEmail(updatedStudent.getEmail());
        existing.setPassword(updatedStudent.getPassword());
        return studentRepository.save(existing);
    }
}