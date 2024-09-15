import { User } from "../models/HiveMindDB.js";
import { convertFileToBLOB } from "../utils/file.utils.js";

export class UserController {
  static async saveProfileImage(userId, profileImageFile) {
    const user = await User.findByPk(userId);

    const profileImage = convertFileToBLOB(profileImageFile);

    user.profileImage = profileImage;
    const savedUser = await user.save();

    const buffer = Buffer.from(await savedUser.profileImage.arrayBuffer());
    savedUser.profileImage = buffer.toString("base64");

    return savedUser;
  }

  static async findById(ideaId) {
    const user = await User.findByPk(ideaId, {
      attributes: { exclude: ["password"] },
    });

    if (user.profileImage) {
      user.profileImage = user.profileImage.toString("base64");
      console.log(user.profileImage);
    }

    return user;
  }
}
