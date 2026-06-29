package com.student.studenttaskmanagement.service;

import com.student.studenttaskmanagement.entity.Reminder;
import com.student.studenttaskmanagement.entity.Task;
import com.student.studenttaskmanagement.entity.Student;
import com.student.studenttaskmanagement.repository.ReminderRepository;
import com.student.studenttaskmanagement.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ReminderService {

    @Autowired
    private ReminderRepository reminderRepository;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private EmailService emailService; // ✅ Add this

    public Reminder saveReminder(Reminder reminder) {
        Reminder saved = reminderRepository.save(reminder);

        // ✅ Send email when reminder is created
        try {
            Task task = taskRepository.findById(
                    reminder.getTask().getTaskId()).orElse(null);

            if (task != null && task.getStudent() != null) {
                Student student = task.getStudent();
                emailService.sendTaskReminderEmail(
                        student.getEmail(),
                        student.getName(),
                        task.getTaskName(),
                        task.getDeadline(),
                        task.getPriority());
            }
        } catch (Exception e) {
            System.err.println("Reminder email failed: " + e.getMessage());
        }

        return saved;
    }

    public List<Reminder> getAllReminders() {
        return reminderRepository.findAll();
    }

    public Reminder getReminderById(Integer id) {
        return reminderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reminder not found: " + id));
    }

    public void deleteReminder(Integer id) {
        reminderRepository.deleteById(id);
    }
}