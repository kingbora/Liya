import express from "express";

const router = express.Router();

router.get("/user", (req, res, next) => {
  res.json({
    resultCode: 1,
    data: {
      name: "kingbora"
    },
  });
});

export default router;