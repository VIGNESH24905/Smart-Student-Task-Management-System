package com.student.studenttaskmanagement.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    // ✅ Send Task Reminder Email
    public void sendTaskReminderEmail(
            String toEmail,
            String studentName,
            String taskName,
            String deadline,
            String priority) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(toEmail);
            helper.setSubject("Task Reminder: " + taskName);
            helper.setText(buildTaskReminderEmail(
                    studentName, taskName, deadline, priority), true);
            mailSender.send(message);
            System.out.println("Email sent to: " + toEmail);
        } catch (MessagingException e) {
            System.err.println("Email failed: " + e.getMessage());
        }
    }

    // ✅ Send Welcome Email
    public void sendWelcomeEmail(String toEmail, String studentName) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(toEmail);
            helper.setSubject("Welcome to Smart Student Task Management!");
            helper.setText(buildWelcomeEmail(studentName), true);
            mailSender.send(message);
            System.out.println("Welcome email sent to: " + toEmail);
        } catch (MessagingException e) {
            System.err.println("Welcome email failed: " + e.getMessage());
        }
    }

    // ✅ Send Announcement Email
    public void sendAnnouncementEmail(
            String toEmail,
            String studentName,
            String title,
            String description) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(toEmail);
            helper.setSubject("New Announcement: " + title);
            helper.setText(buildAnnouncementEmail(
                    studentName, title, description), true);
            mailSender.send(message);
            System.out.println("Announcement email sent to: " + toEmail);
        } catch (MessagingException e) {
            System.err.println("Announcement email failed: " + e.getMessage());
        }
    }

    // ─── Email Templates ───────────────────────────

    private String buildTaskReminderEmail(
            String name,
            String taskName,
            String deadline,
            String priority) {
        String priorityColor = "#16a34a";
        if (priority.equals("High"))
            priorityColor = "#dc2626";
        else if (priority.equals("Medium"))
            priorityColor = "#d97706";

        String html = "<html><body style='font-family:Arial,sans-serif;"
                + "background:#f0f2f5;padding:20px;'>"
                + "<div style='max-width:600px;margin:0 auto;background:#fff;"
                + "border-radius:16px;overflow:hidden;"
                + "box-shadow:0 4px 20px rgba(0,0,0,0.1);'>"

                // Header
                + "<div style='background:linear-gradient(135deg,#4f8ef7,#7c5bf7);"
                + "padding:32px;text-align:center;'>"
                + "<div style='font-size:48px;margin-bottom:8px;'>🎓</div>"
                + "<h1 style='color:#fff;margin:0;font-size:22px;'>"
                + "Smart Student Task Management</h1>"
                + "<p style='color:#c7d7fe;margin:6px 0 0;'>"
                + "Task Reminder Notification</p>"
                + "</div>"

                // Body
                + "<div style='padding:32px;'>"
                + "<p style='font-size:16px;color:#374151;'>Dear <strong>"
                + name + "</strong>,</p>"
                + "<p style='font-size:15px;color:#374151;'>"
                + "This is a reminder for your upcoming task:</p>"

                // Task Card
                + "<div style='background:#f8fafc;border-radius:12px;"
                + "padding:20px;margin:20px 0;"
                + "border-left:4px solid #4f8ef7;'>"
                + "<table style='width:100%;border-collapse:collapse;'>"
                + "<tr>"
                + "<td style='padding:8px 0;color:#64748b;font-size:13px;'>"
                + "Task Name</td>"
                + "<td style='padding:8px 0;font-weight:700;"
                + "color:#1a1f36;font-size:15px;'>"
                + taskName + "</td>"
                + "</tr>"
                + "<tr>"
                + "<td style='padding:8px 0;color:#64748b;font-size:13px;'>"
                + "Deadline</td>"
                + "<td style='padding:8px 0;font-weight:600;"
                + "color:#dc2626;font-size:14px;'>"
                + deadline + "</td>"
                + "</tr>"
                + "<tr>"
                + "<td style='padding:8px 0;color:#64748b;font-size:13px;'>"
                + "Priority</td>"
                + "<td style='padding:8px 0;'>"
                + "<span style='background:" + priorityColor + "22;"
                + "color:" + priorityColor + ";"
                + "padding:3px 10px;border-radius:20px;"
                + "font-size:12px;font-weight:600;'>"
                + priority + "</span>"
                + "</td>"
                + "</tr>"
                + "</table>"
                + "</div>"

                + "<p style='font-size:14px;color:#64748b;'>"
                + "Please complete this task before the deadline.</p>"

                // Button
                + "<div style='text-align:center;margin:24px 0;'>"
                + "<a href='http://localhost:5173/tasks'"
                + " style='background:linear-gradient(135deg,#4f8ef7,#7c5bf7);"
                + "color:#fff;padding:12px 28px;"
                + "border-radius:8px;text-decoration:none;"
                + "font-weight:600;font-size:15px;'>"
                + "View My Tasks</a>"
                + "</div>"
                + "</div>"

                // Footer
                + "<div style='background:#f8fafc;padding:20px;"
                + "text-align:center;border-top:1px solid #e2e8f0;'>"
                + "<p style='color:#94a3b8;font-size:12px;margin:0;'>"
                + "Smart Student Task Management System<br/>"
                + "This is an automated reminder email.</p>"
                + "</div>"

                + "</div></body></html>";

        return html;
    }

    private String buildWelcomeEmail(String name) {
        String html = "<html><body style='font-family:Arial,sans-serif;"
                + "background:#f0f2f5;padding:20px;'>"
                + "<div style='max-width:600px;margin:0 auto;background:#fff;"
                + "border-radius:16px;overflow:hidden;"
                + "box-shadow:0 4px 20px rgba(0,0,0,0.1);'>"

                // Header
                + "<div style='background:linear-gradient(135deg,#4f8ef7,#7c5bf7);"
                + "padding:32px;text-align:center;'>"
                + "<div style='font-size:48px;margin-bottom:8px;'>🎓</div>"
                + "<h1 style='color:#fff;margin:0;font-size:22px;'>"
                + "Welcome to Smart Student!</h1>"
                + "</div>"

                // Body
                + "<div style='padding:32px;'>"
                + "<p style='font-size:16px;color:#374151;'>Dear <strong>"
                + name + "</strong>,</p>"
                + "<p style='font-size:15px;color:#374151;'>"
                + "Welcome to Smart Student Task Management System! "
                + "Your account has been created successfully.</p>"

                // Features
                + "<div style='background:#f8fafc;border-radius:12px;"
                + "padding:20px;margin:20px 0;'>"
                + "<p style='font-weight:700;color:#1a1f36;margin:0 0 12px;'>"
                + "What you can do:</p>"
                + "<div style='color:#374151;font-size:14px;margin-bottom:8px;'>"
                + "✅ Add and manage your academic tasks</div>"
                + "<div style='color:#374151;font-size:14px;margin-bottom:8px;'>"
                + "✅ Set task priorities and deadlines</div>"
                + "<div style='color:#374151;font-size:14px;margin-bottom:8px;'>"
                + "✅ View your weekly timetable</div>"
                + "<div style='color:#374151;font-size:14px;margin-bottom:8px;'>"
                + "✅ Stay updated with announcements</div>"
                + "<div style='color:#374151;font-size:14px;'>"
                + "✅ Track upcoming college events</div>"
                + "</div>"

                // Button
                + "<div style='text-align:center;margin:24px 0;'>"
                + "<a href='http://localhost:5173/login'"
                + " style='background:linear-gradient(135deg,#4f8ef7,#7c5bf7);"
                + "color:#fff;padding:12px 28px;"
                + "border-radius:8px;text-decoration:none;"
                + "font-weight:600;font-size:15px;'>"
                + "Login Now</a>"
                + "</div>"
                + "</div>"

                // Footer
                + "<div style='background:#f8fafc;padding:20px;"
                + "text-align:center;border-top:1px solid #e2e8f0;'>"
                + "<p style='color:#94a3b8;font-size:12px;margin:0;'>"
                + "Smart Student Task Management System<br/>"
                + "Organize. Plan. Achieve.</p>"
                + "</div>"

                + "</div></body></html>";

        return html;
    }

    private String buildAnnouncementEmail(
            String name,
            String title,
            String description) {
        String html = "<html><body style='font-family:Arial,sans-serif;"
                + "background:#f0f2f5;padding:20px;'>"
                + "<div style='max-width:600px;margin:0 auto;background:#fff;"
                + "border-radius:16px;overflow:hidden;"
                + "box-shadow:0 4px 20px rgba(0,0,0,0.1);'>"

                // Header
                + "<div style='background:linear-gradient(135deg,#10b981,#059669);"
                + "padding:32px;text-align:center;'>"
                + "<div style='font-size:48px;margin-bottom:8px;'>📢</div>"
                + "<h1 style='color:#fff;margin:0;font-size:22px;'>"
                + "New Announcement</h1>"
                + "</div>"

                // Body
                + "<div style='padding:32px;'>"
                + "<p style='font-size:16px;color:#374151;'>Dear <strong>"
                + name + "</strong>,</p>"

                // Announcement Card
                + "<div style='background:#f0fdf4;border-radius:12px;"
                + "padding:20px;margin:20px 0;"
                + "border-left:4px solid #10b981;'>"
                + "<h3 style='color:#1a1f36;margin:0 0 8px;'>"
                + title + "</h3>"
                + "<p style='color:#374151;margin:0;font-size:14px;'>"
                + description + "</p>"
                + "</div>"

                // Button
                + "<div style='text-align:center;margin:24px 0;'>"
                + "<a href='http://localhost:5173/announcements'"
                + " style='background:linear-gradient(135deg,#10b981,#059669);"
                + "color:#fff;padding:12px 28px;"
                + "border-radius:8px;text-decoration:none;"
                + "font-weight:600;font-size:15px;'>"
                + "View Announcement</a>"
                + "</div>"
                + "</div>"

                // Footer
                + "<div style='background:#f8fafc;padding:20px;"
                + "text-align:center;border-top:1px solid #e2e8f0;'>"
                + "<p style='color:#94a3b8;font-size:12px;margin:0;'>"
                + "Smart Student Task Management System</p>"
                + "</div>"

                + "</div></body></html>";

        return html;
    }
}