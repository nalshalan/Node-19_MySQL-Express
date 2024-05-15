// Create an express Router
import express from "express";
import { findAll, findOne, addOne, updateOne, removeOne } from "../controllers/controller.product";

const router = express.Router();

// Create the actual routes (GET, POST, PUT, DELETE)
router.get("/:id?", async (req, res, next) => {
    try {
        // Look for an id on the endpoint
        const { id } = req.params;

        let result;
        if (id) {
            // Get the one product using the id
            result = await findOne(id);
        } else {
            // Get all the products
            result = await findAll();
        }

        res.json(result);
    } catch (err) {
        next(err);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const incomingData = req.body;

        if (incomingData) {
            // Try to add the incomingData into the database
            const result = await addOne(incomingData);
            res.json(result);
        } else {
            // If there's no incomingData, then I can't possibly add any new info to the DB
            res.json({ msg: "Error POSTING: No incoming data" });
        }

    } catch (err) {
        next(err);
    }
});

router.put("/:id", async (req, res, next) => {
    try {
        // Grab the id from the incoming request parameters
        const { id } = req.params;
        const incomingData = req.body;

        if (id && incomingData) {
            // Try to update the DB with the provided info
            const result = await updateOne(id, incomingData);
            res.json(result);
        } else {
            // Let the client know that we are missing information to perform the update
            res.json({ msg: "Missing id and/or data to update" });
        }

    } catch (err) {
        next(err);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;

        if (id) {
            // Try to delete the row at the provided id
            const result = await removeOne(id);
            res.json(result);
        } else {
            // Let the client know that I cannot remove something without an id
            res.json({ msg: "Error DELETING: Cannot remove row without id" });
        }
        
    } catch (err) {
        next(err);
    }
});


// export that router
export default router;