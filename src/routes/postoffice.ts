import express, { Request, Response } from "express";
import axios from "axios";

const router = express.Router();

// GET /api/postoffice/:branchName
router.get("/:branchName", async (req: Request, res: Response) => {
  const { branchName } = req.params;

  try {
    const response = await axios.get(
      `https://api.postalpincode.in/postoffice/${encodeURIComponent(
        branchName
      )}`
    );
    const data = response.data;

    if (data[0].Status === "Success") {
      res.json({
        message: `Found ${data[0].PostOffice.length} result(s) for "${branchName}"`,
        results: data[0].PostOffice,
      });
    } else {
      res
        .status(404)
        .json({ error: `No post office found for "${branchName}"` });
    }
  } catch (error: any) {
    console.error("Error fetching post office data:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
