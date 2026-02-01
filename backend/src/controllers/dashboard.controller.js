// import {Project} from "../models/project.models.js";
// import {Task} from "../models/task.models.js";
// import { ProjectMember } from "../models/projectmember.model.js";
// import mongoose from "mongoose";

// export const getDashboardSummary = async (req, res) => {
//   try {
//     const userId = req.user._id;

//     const today = new Date();
//     const next7Days = new Date();
//     next7Days.setDate(today.getDate() + 7);
//     // 1️⃣ Get project IDs where user is a member
// // const projectMemberships = await ProjectMember.find({
// //   user: new mongoose.Types.ObjectId(req.user._id),
// // }).select("project");

// // const projectIds = projectMemberships.map(pm => pm.project);

// // 2️⃣ Count projects
// // const totalProjects = projectIds.length;


// const projectIds = await ProjectMember.distinct("project", {
//   user: userId,
// });
// const totalProjects = projectIds.length;

//     // 🔢 BASIC COUNTS
//     // const totalProjects = await Project.countDocuments({
//     //   members: userId
//     // });

//     const totalTasks = await Task.countDocuments({
//       assignedTo: userId
//     });

//     const completedTasks = await Task.countDocuments({
//       assignedTo: userId,
//       status: "done"
//     });

//     const overdueTasks = await Task.countDocuments({
//       assignedTo: userId,
//       endDate: { $lt: today },
//       status: { $ne: "done" }
//     });

//     const tasksDueIn7Days = await Task.countDocuments({
//       assignedTo: userId,
//       endDate: { $gte: today, $lte: next7Days },
//       status: { $ne: "done" }
//     });

//     // const projectsDueIn7Days = await Project.countDocuments({
//     //   members: userId,
//     //   endDate: { $gte: today, $lte: next7Days }
//     // });

//     const projectsDueIn7Days = await Project.countDocuments({
//   _id: { $in: projectIds },
//   endDate: {
//     $gte: new Date(),
//     $lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
//   },
// });


//     // 📊 TASK STATUS DISTRIBUTION
//     const taskStatusAggregation = await Task.aggregate([
//       {
//         $match: { assignedTo: userId }
//       },
//       {
//         $group: {
//           _id: "$status",
//           count: { $sum: 1 }
//         }
//       }
//     ]);

//     const taskStatusCount = {
//       todo: 0,
//       inprogress: 0,
//       done: 0
//     };

//     taskStatusAggregation.forEach(item => {
//       taskStatusCount[item._id] = item.count;
//     });

//     // 📈 TASK TREND (LAST 7 DAYS)
//     const taskTrend = await Task.aggregate([
//       {
//         $match: {
//           assignedTo: userId,
//           createdAt: { $gte: new Date(today.setDate(today.getDate() - 7)) }
//         }
//       },
//       {
//         $group: {
//           _id: {
//             $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
//           },
//           count: { $sum: 1 }
//         }
//       },
//       { $sort: { _id: 1 } }
//     ]);

//     res.status(200).json({
//       success: true,
//       data: {
//         totalProjects,
//         totalTasks,
//         completedTasks,
//         overdueTasks,
//         tasksDueIn7Days,
//         projectsDueIn7Days,
//         taskStatusCount,
//         taskTrend
//       }
//     });
//   } catch (error) {
//     console.error("Dashboard Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to load dashboard data"
//     });
//   }
// };



import { Project } from "../models/project.models.js";
import { Task } from "../models/task.models.js";
import { ProjectMember } from "../models/projectmember.model.js";
import mongoose from "mongoose";

const calculateProjectHealth = ({
  totalTasks,
  completedTasks,
  overdueTasks,
  startDate,
  endDate,
  statusCount,
}) => {
  if (totalTasks === 0) return 100;

  // 1️⃣ Completion (40)
  const completionScore = (completedTasks / totalTasks) * 40;

  // 2️⃣ Overdue penalty (25)
  const overdueRate = overdueTasks / totalTasks;
  const overdueScore = Math.max(0, 25 - overdueRate * 25);

  // 3️⃣ Timeline (20)
  const now = Date.now();
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();

  let timelineScore = 20;
  if (now > end) timelineScore = 0;
  else {
    const timeProgress = (now - start) / (end - start);
    timelineScore = Math.max(0, 20 - timeProgress * 20);
  }

  // 4️⃣ Status balance (15)
  const todo = statusCount.todo || 0;
  const inprogress = statusCount.inprogress || 0;
  let statusScore = todo > inprogress * 2 ? 8 : 15;

  return Math.round(
    completionScore + overdueScore + timelineScore + statusScore
  );
};

export const getDashboardSummary = async (req, res) => {
  try {
    const userId = req.user._id;
    const today = new Date();
    const next7Days = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    // ✅ DISTINCT project IDs (FIXED)
    // const projectIds = await ProjectMember.distinct("project", {
    //   user: userId,
    // });

    // const totalProjects = projectIds.length;

   const projectIds = await ProjectMember.distinct("project", {
  user: new mongoose.Types.ObjectId(userId),
});

const validProjects = await Project.find({
  _id: { $in: projectIds },
}).select("_id");

const validProjectIds = validProjects.map(p => p._id);
const totalProjects = validProjectIds.length;



    // 🔢 TASK COUNTS
    const totalTasks = await Task.countDocuments({ assignedTo: userId });
    const completedTasks = await Task.countDocuments({
      assignedTo: userId,
      status: "done",
    });
    const overdueTasks = await Task.countDocuments({
      assignedTo: userId,
      endDate: { $lt: today },
      status: { $ne: "done" },
    });
    const tasksDueIn7Days = await Task.countDocuments({
      assignedTo: userId,
      endDate: { $gte: today, $lte: next7Days },
      status: { $ne: "done" },
    });

    const projectsDueIn7Days = await Project.countDocuments({
      _id: { $in: validProjectIds },
      endDate: { $gte: today, $lte: next7Days },
    });

    // 📊 TASK STATUS
    const taskStatusAggregation = await Task.aggregate([
      { $match: { assignedTo: userId } },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    // const taskStatusCount = { todo: 0, inprogress: 0, done: 0 };
    // taskStatusAggregation.forEach(i => {
    //   taskStatusCount[i._id] = i.count;
    // });

    const taskStatusCount = { todo: 0, in_progress: 0, done: 0 };

taskStatusAggregation.forEach(i => {
  const key =
    i._id === "inprogress" ? "in_progress" : i._id;

  taskStatusCount[key] =
    (taskStatusCount[key] || 0) + i.count;
});


    // 📈 TASK TREND
    const taskTrend = await Task.aggregate([
      {
        $match: {
          assignedTo: userId,
          createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // 🩺 PROJECT HEALTH
    // const projects = await Project.find({ _id: { $in: projectIds } });
    const projects = await Project.find({ _id: { $in: validProjectIds } });
    const projectHealth = [];

    for (const project of projects) {
      const tasks = await Task.find({ project: project._id });

      const total = tasks.length;
      const done = tasks.filter(t => t.status === "done").length;
      const overdue = tasks.filter(
        t => t.endDate && new Date(t.endDate) < today && t.status !== "done"
      ).length;

      const statusCount = {
        todo: tasks.filter(t => t.status === "todo").length,
        inprogress: tasks.filter(t => t.status ==="in_progress").length,
        done,
      };

      const healthScore = calculateProjectHealth({
        totalTasks: total,
        completedTasks: done,
        overdueTasks: overdue,
        startDate: project.startDate,
        endDate: project.endDate,
        statusCount,
      });

      projectHealth.push({
        projectId: project._id,
        title: project.title,
        name: project.name,
        healthScore,
        status:
          healthScore >= 80
            ? "Healthy"
            : healthScore >= 50
            ? "At Risk"
            : "Critical",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        totalProjects,
        totalTasks,
        completedTasks,
        overdueTasks,
        tasksDueIn7Days,
        projectsDueIn7Days,
        taskStatusCount,
        taskTrend,
        projectHealth,
      },
    });
  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to load dashboard data",
    });
  }
};


export const getTaskAnalytics = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user._id);

    const today = new Date();
    const last7Days = new Date();
    last7Days.setDate(today.getDate() - 6);

    /* ===============================
       1️⃣ TASKS CREATED (LAST 7 DAYS)
    =============================== */
    const createdTasks = await Task.aggregate([
      {
        $match: {
          assignedTo: userId,
          createdAt: { $gte: last7Days }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt"
            }
          },
          count: { $sum: 1 }
        }
      }
    ]);

    /* ===============================
       2️⃣ TASKS COMPLETED (LAST 7 DAYS)
    =============================== */
    const completedTasks = await Task.aggregate([
      {
        $match: {
          assignedTo: userId,
          status: "done",
          updatedAt: { $gte: last7Days }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$updatedAt"
            }
          },
          count: { $sum: 1 }
        }
      }
    ]);

    /* ===============================
       3️⃣ TASK STATUS DISTRIBUTION
    =============================== */
    const statusDistribution = await Task.aggregate([
      {
        $match: { assignedTo: userId }
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    /* ===============================
       4️⃣ FORMAT DATA FOR FRONTEND
    =============================== */

    // Create last 7 days labels
    const labels = [];
    const createdMap = {};
    const completedMap = {};

    createdTasks.forEach(t => createdMap[t._id] = t.count);
    completedTasks.forEach(t => completedMap[t._id] = t.count);

    for (let i = 0; i < 7; i++) {
      const date = new Date(last7Days);
      date.setDate(last7Days.getDate() + i);
      const key = date.toISOString().split("T")[0];

      labels.push(key);
    }

    const createdSeries = labels.map(d => createdMap[d] || 0);
    const completedSeries = labels.map(d => completedMap[d] || 0);

    // const statusCount = {
    //   todo: 0,
    //   inprogress: 0,
    //   done: 0
    // };

    // statusDistribution.forEach(s => {
    //   statusCount[s._id] = s.count;
    // });

    const statusCount = { todo: 0, in_progress: 0, done: 0 };

statusDistribution.forEach(s => {
  const key =
    s._id === "inprogress" ? "in_progress" : s._id;

  statusCount[key] =
    (statusCount[key] || 0) + s.count;
});


    res.status(200).json({
      success: true,
      data: {
        trend: {
          labels,
          created: createdSeries,
          completed: completedSeries
        },
        statusDistribution: statusCount
      }
    });

  } catch (error) {
    console.error("Task Analytics Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to load task analytics"
    });
  }
};


export const getMyProductivityStats = async (req, res) => {
  try {
    const userId = req.user._id;
    const today = new Date();

    // Tasks assigned to me
    const totalAssignedTasks = await Task.countDocuments({
      assignedTo: userId,
    });

    // Tasks completed by me
    const completedTasks = await Task.countDocuments({
      assignedTo: userId,
      status: "done",
    });

    // Overdue tasks
    const overdueTasks = await Task.countDocuments({
      assignedTo: userId,
      status: { $ne: "done" },
      endDate: { $lt: today },
    });

    // Completion rate
    const completionRate =
      totalAssignedTasks === 0
        ? 0
        : Math.round((completedTasks / totalAssignedTasks) * 100);

    res.status(200).json({
      success: true,
      data: {
        totalAssignedTasks,
        completedTasks,
        overdueTasks,
        completionRate,
      },
    });
  } catch (error) {
    console.error("Productivity Stats Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to load productivity stats",
    });
  }
};


export const getDueTasks = async (req, res) => {
  try {
    const userId = req.user._id;
    const today = new Date();
    const next7Days = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const tasks = await Task.find({
      assignedTo: userId,
      status: { $ne: "done" },
      endDate: { $gte: today, $lte: next7Days },
    })
      .populate("project", "name")
      .sort({ endDate: 1 })
      .select("title priority endDate status project");

    res.json({
      success: true,
      data: tasks,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};


// export const getDueProjects = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const today = new Date();
//     const next7Days = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

//     const projectIds = await ProjectMember.distinct("project", {
//       user: userId,
//     });

//     const projects = await Project.find({
//       _id: { $in: projectIds },
//       endDate: { $gte: today, $lte: next7Days },
//     }).select("name startDate endDate");

//     res.json({
//       success: true,
//       data: projects,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false });
//   }
// };

export const getDueProjects = async (req, res) => {
  try {
    const userId = req.user._id;
    const today = new Date();
    const next7Days = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const projectIds = await ProjectMember.distinct("project", {
      user: userId,
    });

    const projects = await Project.aggregate([
      {
        $match: {
          _id: { $in: projectIds },
          endDate: { $gte: today, $lte: next7Days },
        },
      },
      {
        $lookup: {
          from: "tasks",
          localField: "_id",
          foreignField: "project",
          as: "tasks",
        },
      },
      {
        $addFields: {
          totalTasks: { $size: "$tasks" },
          completedTasks: {
            $size: {
              $filter: {
                input: "$tasks",
                as: "task",
                cond: { $eq: ["$$task.status", "done"] },
              },
            },
          },
        },
      },
      {
        $project: {
          name: 1,
          startDate: 1,
          endDate: 1,
          totalTasks: 1,
          completedTasks: 1,
        },
      },
    ]);

    res.json({
      success: true,
      data: projects,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};



