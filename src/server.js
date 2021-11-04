import express from "express";
import cors from "cors";
import { default as route } from "./routes/index.js";
// web token
import { default as jwt } from "./utils/jwt.js";
import { Strategy as BearerStrategy } from "passport-http-bearer";
import passport from "passport";

// SEQUELIZE
import { default as db } from "./models/index.js";
// sync to database if not exists
// await db.sequelize.sync({ force: true });

// EXPRESS
const app = express();
app.use(cors());
app.get("/", (req, res) => {
  return res.status(httpStatus.OK).json({ message: "App is working" });
});

// define http bearer strategy

const getInfoStrategy = {
  admin: async (id) => {
    const user = await db.admin.findOne({ where: { id } });
    const info = {
      id: user.id,
      schoolId: "",
      role: user.role,
    };
    console.log(info);
    return info;
  },
  school: async (id) => {
    const user = await db.school.findOne({ where: { id } });
    const info = {
      id: user.id,
      schoolId: "",
      role: user.role,
    };
    return info;
  },
  teacher: async (id) => {
    const user = await db.teacher.findOne({ where: { id } });
    const info = {
      id: user.id,
      schoolId: user.schoolId,
      role: user.role,
    };
    return info;
  },
  student: async (id) => {
    const user = await db.student.findOne({ where: { id } });

    const info = {
      id: user.id,
      schoolId: user.schoolId,
      role: user.role,
    };

    return info;
  },
};

const verify = async (token, done) => {
  try {
    const decodedToken = await jwt.verifyAccessToken(token);

    if (!decodedToken) {
      console.log("Decoded failure");
      return done(new Error("Invalid Token"));
    }
    // Get user info by role
    const userInfo = await getInfoStrategy[decodedToken.role](decodedToken.sub);
    return done(null, userInfo);
  } catch (err) {
    return done(err);
  }
};
const strategy = new BearerStrategy(verify);

// passport -- using bearer strategy
app.use(passport.initialize());
passport.use("jwt", strategy);

// JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTE
route(app);

export default app;
