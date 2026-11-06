import User from "../Model/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// REGISTER
export const register = async (req, res) => {
  try {
    const {
      fullName,
      username,
      email,
      phone,
      cnic,
      country,
      gender,
      password,
      accountType,
    } = req.body;

    // Required fields validation
    if (
      !fullName ||
      !username ||
      !email ||
      !phone ||
      !cnic ||
      !country ||
      !gender ||
      !password ||
      !accountType
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check existing user
    const existingUser = await User.findOne({
      where: {
        email: normalizedEmail,
      },
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    const existingUsername = await User.findOne({
      where: { username: username.trim() },
    });

    if (existingUsername) {
      return res.status(409).json({
        success: false,
        message: "Username already exists",
      });
    }

    const existingCNIC = await User.findOne({
      where: { cnic: cnic.trim() },
    });

    if (existingCNIC) {
      return res.status(409).json({
        success: false,
        message: "CNIC already registered",
      });
    }

    // Password hashing
    const hashedPassword = await bcrypt.hash(password, 12);

    // Save user
    const user = await User.create({
      fullName: fullName.trim(),
      username: username.trim(),
      email: normalizedEmail,
      phone: phone.trim(),
      cnic: cnic.trim(),
      country: country.trim(),
      gender,
      passwordHash: hashedPassword,
      profilePicture: req.file
        ? `/uploads/${req.file.filename}`
        : null,
      accountType,
    });

    return res.status(201).json({
      success: true,
      message: "Registration successful",
      user: {
        id: user.id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);

    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        success: false,
        message: "Email, username or CNIC already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Registration failed",
    });
  }
};


// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({
      where: {
        email: email.trim().toLowerCase(),
      },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.passwordHash
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};