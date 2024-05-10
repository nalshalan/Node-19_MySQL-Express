import express from "express";
import db from "../mockdb/index.js";

const router = express.Router();

// GET
router.get("/:id?", async (req, res, next) => {
    try {
       // TODO
       const id = req.params.id;

       let data;

       if (id) {
        data = await db.getOne(id);
       } else {
        data = await db.getAll();
       }
       res.json(data);
    } catch (error) {
       next(error);
    }
 });

// POST
router.post("/", async (req, res, next) => {
    try {
       // TODO
       const newUser = req.body;

       const data = await db.add(newUser);
       res.json(data);

    } catch (error) {
       next(error);
    }
 });

// PUT
router.put("/:id", async (req, res, next) => {
   try {
      // TODO
      const id = req.params.id;
      const updatedUser = req.body;
      const data = await db.update(id, updatedUser);
      res.json(data);

   } catch (error) {
      next(error);
   }
});

// DELETE
router.delete("/:id", async (req, res, next) => {
   try {
      // TODO
      const id = req.params.id;
      const data = await db.remove(id);
      res.json(data);

   } catch (error) {
      next(error);
   }
});

export default router;