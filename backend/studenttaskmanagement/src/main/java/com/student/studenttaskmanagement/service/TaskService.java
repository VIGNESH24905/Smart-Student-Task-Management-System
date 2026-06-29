package com.student.studenttaskmanagement.service;

import com.student.studenttaskmanagement.entity.Task;
import com.student.studenttaskmanagement.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public Task saveTask(Task task) {
        return taskRepository.save(task);
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Task getTaskById(Integer id) {
       
        return taskRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));
    }

    public void deleteTask(Integer id) {
        taskRepository.deleteById(id);
    }

    public Task updateTask(Integer id, Task updatedTask) {
        Task existing = taskRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));
        existing.setTaskName(updatedTask.getTaskName());
        existing.setDescription(updatedTask.getDescription());
        existing.setDeadline(updatedTask.getDeadline());
        existing.setPriority(updatedTask.getPriority());
        existing.setStatus(updatedTask.getStatus());
        return taskRepository.save(existing);
    }

 
    public List<Task> getTasksByStudentId(Integer studentId) {
        return taskRepository.findByStudent_StudentId(studentId);
    }
}