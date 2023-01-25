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

router.get("/brandWithLessModels", async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(fileName));
    let results = [];
    data.sort((a, b) => a.models.length - b.models.length);
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

router.get("/brandWithMoreModels/:qtd", async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(fileName));
    let results = [];
    data.sort((a, b) => b.models.length - a.models.length);
    req.params.id;
    for (let i = 0; i < data.length; i++) {
      if (results.length === 0) {
        results.push(data[i]);
      } else if (
        results[results.length - 1].models.length === data[i].models.length
      ) {
        let flag = results[results.length - 1].brand > data[i].brand;
        if (flag) {
          results[results.length - 1] = data[i];
        }
      } else {
        results.push(data[i]);
      }
      if (results.length === parseInt(req.params.qtd)) {
        break;
      }
    }
    res.send(
      results.map(function (element) {
        return `${element.brand} - ${element.models.length}`;
      })
    );
  } catch (err) {
    next(err);
  }
});

router.get("/brandWithLessModels/:qtd", async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(fileName));
    let results = [];
    data.sort((a, b) => a.models.length - b.models.length);
    req.params.id;
    for (let i = 0; i < data.length; i++) {
      if (results.length === 0) {
        results.push(data[i]);
      } else if (
        results[results.length - 1].models.length === data[i].models.length
      ) {
        let flag = results[results.length - 1].brand > data[i].brand;
        if (flag) {
          results[results.length - 1] = data[i];
        }
      } else {
        results.push(data[i]);
      }
      if (results.length === parseInt(req.params.qtd)) {
        break;
      }
    }
    res.send(
      results.map(function (element) {
        return `${element.brand} - ${element.models.length}`;
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
