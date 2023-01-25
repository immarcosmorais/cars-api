import express from "express";
const router = express.Router();

router.get("/", async (req, res, next) => {
  res.end();
});

export default router;
