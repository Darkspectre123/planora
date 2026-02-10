import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  // Initialize mailgen instance with default theme and brand configuration
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Task Manager",
      link: "https://taskmanager.app",
    },
  });

  const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent);


  const emailHtml = mailGenerator.generate(options.mailgenContent);


   const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

await transporter.verify();

  const mail = {
    // from: "mail.taskmanager@example.com",
    from: `"Task Manager" <${process.env.EMAIL_USER}>`,// // We can name this anything. The mail will go to your Mailtrap inbox
    to: options.email, // receiver's mail
    subject: options.subject, // mail subject
    text: emailTextual, // mailgen content textual variant
    html: emailHtml, // mailgen content html variant
  };

  try {
    await transporter.sendMail(mail);
  } catch (error) {
    console.error(
      "Email service failed silently. Make sure you have provided your MAILTRAP credentials in the .env file",
    );
    console.error("Error: ", error);
  }
};

const emailVerificationMailgenContent = (username, verificationUrl) => {
  return {
    body: {
      name: username,
      intro: "Welcome to our app! We're very excited to have you on board.",
      action: {
        instructions:
          "To verify your email please click on the following button:",
        button: {
          color: "#22BC66", // Optional action button color
          text: "Verify your email",
          link: verificationUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};
const forgotPasswordMailgenContent = (username, passwordResetUrl) => {
  return {
    body: {
      name: username,
      intro: "We got a request to reset the password of our account",
      action: {
        instructions:
          "To reset your password click on the following button or link:",
        button: {
          color: "#22BC66", // Optional action button color
          text: "Reset password",
          link: passwordResetUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};
const taskReminderMailgenContent = (
  username,
  taskTitle,
  dueDate,
  projectName,
  type,
) => {
  return {
    body: {
      name: username,
      intro:
        type === "today"
          ? "⏰ Your task is due today!"
          : "⏳ Reminder: Your task is due tomorrow",
      table: {
        data: [
          {
            Task: taskTitle,
            Project: projectName,
            "Due Date": dueDate,
          },
        ],
      },
      outro:
        "Please make sure to complete the task on time. Let us know if you need any help.",
    },
  };
};
const projectReminderMailgenContent = (
  userName,
  projectName,
  dueDate,
  type
) => ({
  body: {
    name: userName,
    intro:
      type === "today"
        ? `🚨 Your project "${projectName}" is due today!`
        : `⏳ Reminder: Your project "${projectName}" is due tomorrow.`,
    table: {
      data: [
        {
          Project: projectName,
          "Due Date": dueDate,
        },
      ],
    },
    outro: "Please make sure everything is wrapped up on time 🚀",
  },
});
const projectMemberAddedMailgenContent = (
  username,
  projectName,
  role
) => {
  return {
    body: {
      name: username,
      intro: `🎉 You have been added to a new project!`,
      table: {
        data: [
          {
            Project: projectName,
            Role: role.toUpperCase(),
          },
        ],
      },
      outro:
        "You can now access the project from your dashboard. Let us know if you have any questions!",
    },
  };
};

const taskAssignedMailgenContent = (
  username,
  taskTitle,
  dueDate,
  projectName,
  assignedBy
) => {
  return {
    body: {
      name: username,
      intro: "📌 A new task has been assigned to you!",
      table: {
        data: [
          {
            Task: taskTitle,
            Project: projectName,
            "Due Date": dueDate || "Not set",
            "Assigned By": assignedBy,
          },
        ],
      },
      outro: "Please check your dashboard for more details.",
    },
  };
};



export {
  emailVerificationMailgenContent,
  forgotPasswordMailgenContent,
  taskReminderMailgenContent,
  projectReminderMailgenContent,
  sendEmail,
  projectMemberAddedMailgenContent,
  taskAssignedMailgenContent
};
