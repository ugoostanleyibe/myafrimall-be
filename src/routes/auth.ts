import { authenticate, AuthRequest } from "../middleware/auth";
import { body, validationResult } from "express-validator";
import { Request, Response, Router } from "express";
import { User } from "../models/User";
import { config } from "../config";
import jwt from "jsonwebtoken";

const router = Router();

const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  } as jwt.SignOptions);
};

// POST /api/auth/register
router.post(
  "/register",
  [
    body("firstName")
      .trim()
      .notEmpty()
      .withMessage("First name is required")
      .isLength({ max: 50 })
      .withMessage("First name cannot exceed 50 characters"),
    body("lastName")
      .trim()
      .notEmpty()
      .withMessage("Last name is required")
      .isLength({ max: 50 })
      .withMessage("Last name cannot exceed 50 characters"),
    body("email")
      .trim()
      .isEmail()
      .withMessage("Please enter a valid email")
      .normalizeEmail(),
    body("phone").trim().notEmpty().withMessage("Phone number is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ message: errors.array()[0].msg });
      return;
    }

    const { firstName, lastName, email, phone, password } = req.body;

    try {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        res
          .status(409)
          .json({ message: "An account with this email already exists" });

        return;
      }

      const user = new User({ firstName, lastName, email, phone, password });
      await user.save();

      const token = generateToken(String(user._id));

      res.cookie("token", token, {
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: "lax",
        httpOnly: true,
      });

      res.status(201).json({
        message: "Account created successfully",
        user: user.toJSON(),
        token,
      });
    } catch (error) {
      res.status(500).json({ message: "Server error during registration" });
      console.error("Registration error:", error);
    }
  },
);

// POST /api/auth/login
router.post(
  "/login",
  [
    body("email")
      .trim()
      .isEmail()
      .withMessage("Please enter a valid email")
      .normalizeEmail(),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ message: errors.array()[0].msg });
      return;
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        res.status(401).json({ message: "Invalid email or password" });
        return;
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        res.status(401).json({ message: "Invalid email or password" });
        return;
      }

      const token = generateToken(String(user._id));

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.json({
        message: "Login successful",
        token,
        user: user.toJSON(),
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Server error during login" });
    }
  },
);

// GET /api/auth/me
router.get("/me", authenticate, (req: AuthRequest, res: Response) => {
  res.json({ user: req.user?.toJSON() });
});

// POST /api/auth/logout
router.post("/logout", (_req: Request, res: Response) => {
  res.json({ message: "Logged out successfully" });
  res.clearCookie("token");
});

export default router;
