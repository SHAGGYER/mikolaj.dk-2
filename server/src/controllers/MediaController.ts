import Media from "../models/Media";
import path from "path";
import fs from "fs";

export const deleteMedia = async (req, res) => {
  const media = await Media.findById(req.params.id);

  const filepath = path.join(__dirname, "../..", "uploads/" + media.filePath);
  if (fs.existsSync(filepath)) {
    fs.unlinkSync(filepath);
  }

  media.remove();
  res.sendStatus(204);
};

export const uploadMedia = async (req, res) => {
  const media = new Media({
    filePath: req.file.filename,
    originalName: req.file.originalname,
  });
  await media.save();
  res.send(media);
};

export const getMedia = async (_req, res) => {
  const media = await Media.find().sort({ createdAt: -1 });
  res.send(media);
};

export const deleteAllMedia = async (_req, res) => {
  const medias = await Media.find();
  for (let media of medias) {
    const filepath = path.join(__dirname, "../..", "uploads/" + media.filePath);
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }
    await media.remove();
  }

  res.sendStatus(204);
};
