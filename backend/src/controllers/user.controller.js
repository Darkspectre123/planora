import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { User } from "../models/user.models.js";

export const uploadProfilePhoto = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, "Profile image is required");
  }

  const baseUrl = process.env.SERVER_URL || "http://localhost:8000";

  const avatar = {
    url: `${baseUrl}/images/${req.file.filename}`,
    localPath: `public/images/${req.file.filename}`,
  };

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true }
  ).select("-password -refreshToken");

  return res.status(200).json(
    new ApiResponse(200, user, "Profile photo updated successfully")
  );
});
