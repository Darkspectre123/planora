import cron from "node-cron";
import dayjs from "dayjs";
import { Project } from "../models/project.models.js";
import {
  sendEmail,
  projectReminderMailgenContent,
} from "../utils/mail.js";

cron.schedule("0 9 * * *", async () => {
  console.log("🔔 Project reminder cron running...");

  const today = dayjs().startOf("day");
  const tomorrow = dayjs().add(1, "day").startOf("day");

  const projects = await Project.find({
    endDate: {
      $lte: tomorrow.endOf("day").toDate(),
    },
  }).populate("createdBy", "email fullName");

  console.log(`📌 Found ${projects.length} projects for reminder`);

  for (const project of projects) {
    if (!project.createdBy?.email || !project.endDate) continue;

    const dueDate = dayjs(project.endDate);

    // 🔴 Due Today
    if (
      dueDate.isSame(today, "day") &&
      !project.reminderSentToday
    ) {
      await sendEmail({
        email: project.createdBy.email,
        subject: "⏰ Project Due Today",
        mailgenContent: projectReminderMailgenContent(
          project.createdBy.fullName,
          project.name,
          dueDate.format("DD MMM YYYY"),
          "today"
        ),
      });

      project.reminderSentToday = true;
      await project.save();

      console.log("📧 Sent TODAY reminder for project:", project.name);
    }

    // 🟡 Due Tomorrow
    if (
      dueDate.isSame(tomorrow, "day") &&
      !project.reminderSentBefore
    ) {
      await sendEmail({
        email: project.createdBy.email,
        subject: "⏳ Project Due Tomorrow",
        mailgenContent: projectReminderMailgenContent(
          project.createdBy.fullName,
          project.name,
          dueDate.format("DD MMM YYYY"),
          "tomorrow"
        ),
      });

      project.reminderSentBefore = true;
      await project.save();

      console.log("📧 Sent TOMORROW reminder for project:", project.name);
    }
  }
});
