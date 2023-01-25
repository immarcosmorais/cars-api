import express from "express";
const router = express.Router();
import { promises as fs } from "fs";
const { readFile } = fs;

router.get("/brandWithMoreModels", async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(fileName));
    let results = [];
    data.sort((a, b) => b.models.length - a.models.length);
    data.forEach((record) => {
      if (results.length === 0) {
        results.push(record);
      } else {
        results.forEach((result) => {
          if (result.models.length === record.models.length) {
            results.push(record);
          }
        });
      }
    });
    res.send(
      results.map(function (element) {
        return element.brand;
      })
    );
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
  res.status(400).send({ error: err.message });
});

export default router;
