import AdminModel from "../../model/admin/adminSchema.js";
import bcrypt from "bcryptjs";
import { sendToken } from "../../sendToken/sendToken.js";

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ status: false, message: "wrong email/password" });
    }

    // console.log(name, email);
    let user = await AdminModel.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(400)
        .json({ status: false, message: "user not found!" });
    }

    const isMatch = await user.isMatchPassword(password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ status: false, message: "wrong email/password" });
    }
    // const salt = await bcrypt.genSalt(10);
    // // console.log(admin);

    // const password = await bcrypt.hash(req.body.password, salt);
    // // console.log(password, name, email);

    // console.log(admin);

    sendToken(res, user, 200, "Login successful!");
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};
