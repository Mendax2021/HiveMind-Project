import { User } from "../models/HiveMindDB.js";
import { convertFileToBLOB } from "../utils/file.utils.js";

export class UserController {
  static async saveProfileImage(userId, profileImageFile) {
    const user = await User.findByPk(userId);

    const profileImage = convertFileToBLOB(profileImageFile);
    console.log("profileImage:", profileImage);
    user.profileImage = profileImage;

    const buffer = Buffer.from(await user.profileImage.arrayBuffer());
    user.profileImage = buffer.toString("base64");

    const savedUser = await user.save();

    return savedUser;
  }

  static async findById(ideaId) {
    const user = await User.findByPk(ideaId);

    return user;
  }
}
