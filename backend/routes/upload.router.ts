import express, { Request, Response } from "express";
import upload from "../utils/file-upload";
import { cwd } from "process";

const router = express.Router();

router.post("/", upload.single("image"), (req: Request, res: Response) => {
  // finding the index of \\images and splitting the path from that index to the last
  const path = req.file?.path.indexOf("\\images");
  if (path) {
    const filePath = req.file?.path.substring(path);
    res.send(filePath);
  }
});

export default router;
