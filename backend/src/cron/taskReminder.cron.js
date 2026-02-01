import cron from "node-cron";
import dayjs from "dayjs";
import {Task} from "../models/task.models.js";
import {
  sendEmail,
  taskReminderMailgenContent,
} from "../utils/mail.js";

cron.schedule("0 9 * * *", async () => {
  console.log("🔔 Task reminder cron running...");

  const today = dayjs().startOf("day");
  const tomorrow = dayjs().add(1, "day").startOf("day");

  const tasks = await Task.find({
    status: { $in: ["todo", "in_progress"] },
    endDate: {
      $lte: tomorrow.endOf("day").toDate(),
    },
  })
    .populate("assignedTo", "email fullName")
    .populate("project", "name");

  console.log(`📌 Found ${tasks.length} tasks for reminder`);

  for (const task of tasks) {
    if (!task.assignedTo?.email) continue;

    const dueDate = dayjs(task.endDate);

    // 🔴 Due Today
    if (
      dueDate.isSame(today, "day") &&
      !task.reminderSentToday
    ) {
      await sendEmail({
        email: task.assignedTo.email,
        subject: "⏰ Task Due Today",
        mailgenContent: taskReminderMailgenContent(
          task.assignedTo.fullName,
          task.title,
          dueDate.format("DD MMM YYYY"),
          task.project?.name || "Project",
          "today"
        ),
      });

      task.reminderSentToday = true;
      await task.save();

      console.log("📧 Sent TODAY reminder for:", task.title);
    }

    // 🟡 Due Tomorrow
    if (
      dueDate.isSame(tomorrow, "day") &&
      !task.reminderSentBefore
    ) {
      await sendEmail({
        email: task.assignedTo.email,
        subject: "⏳ Task Due Tomorrow",
        mailgenContent: taskReminderMailgenContent(
          task.assignedTo.fullName,
          task.title,
          dueDate.format("DD MMM YYYY"),
          task.project?.name || "Project",
          "tomorrow"
        ),
      });

      task.reminderSentBefore = true;
      await task.save();

      console.log("📧 Sent TOMORROW reminder for:", task.title);
    }
  }
});
