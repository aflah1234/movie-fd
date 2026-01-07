import React, { useState } from "react";
import axiosInstance from "../../config/axiosInstance";
import { Button } from "../ui/Buttons";
import toast from "react-hot-toast";

const AddMovieModal = ({ isOpen, onClose, onMovieAdded }) => {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [genre, setGenre] = useState("");
  const [plot, setPlot] = useState("");
  const [cast, setCast] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [language, setLanguage] = useState("");
  const [bannerImg, setBannerImg] = useState("");
  const [verticalImg, setVerticalImg] = useState("");
  const [bannerImgFile, setBannerImgFile] = useState(null);
  const [verticalImgFile, setVerticalImgFile] = useState(null);
  const [bannerImgType, setBannerImgType] = useState("url"); // "url" or "file"
  const [verticalImgType, setVerticalImgType] = useState("url"); // "url" or "file"

  const resetForm = () => {
    setTitle("");
    setDuration("");
    setGenre("");
    setPlot("");
    setCast("");
    setReleaseDate("");
    setLanguage("");
    setBannerImg("");
    setVerticalImg("");
    setBannerImgFile(null);
    setVerticalImgFile(null);
    setBannerImgType("url");
    setVerticalImgType("url");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that images are provided
    if (bannerImgType === "url" && !bannerImg) {
      toast.error("Please provide a banner image URL or upload a file");
      return;
    }
    if (bannerImgType === "file" && !bannerImgFile) {
      toast.error("Please upload a banner image file");
      return;
    }
    if (verticalImgType === "url" && !verticalImg) {
      toast.error("Please provide a vertical image URL or upload a file");
      return;
    }
    if (verticalImgType === "file" && !verticalImgFile) {
      toast.error("Please upload a vertical image file");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("duration", duration);
    formData.append("genre", genre);
    formData.append("plot", plot);
    formData.append("cast", cast);
    formData.append("releaseDate", releaseDate);
    formData.append("language", language);

    // Add images based on type
    if (bannerImgType === "url") {
      formData.append("bannerImg", bannerImg);
    } else if (bannerImgFile) {
      formData.append("bannerImg", bannerImgFile);
    }

    if (verticalImgType === "url") {
      formData.append("verticalImg", verticalImg);
    } else if (verticalImgFile) {
      formData.append("verticalImg", verticalImgFile);
    }

    try {
      const response = await axiosInstance.post("/movie/add-movie", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200 || response.status === 201) {
        toast.success("Movie added successfully!");
        onMovieAdded(response.data.data);
        resetForm();
        onClose();
      } else {
        throw new Error("Unexpected response status");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to add movie";
      toast.error(errorMessage);
      console.error("Error adding movie:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open backdrop-blur-sm">
      <div className="modal-box max-h-[90vh] overflow-y-auto my-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-primary">ADD MOVIE</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 rounded-md bg-base-300 border border-gray-600 focus:outline-none focus:border-primary text-base"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Duration (3h)</label>
            <input
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full p-2 rounded-md bg-base-300 border border-gray-600 focus:outline-none focus:border-primary text-base"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Genre (comma-separated)</label>
            <input
              type="text"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="w-full p-2 rounded-md bg-base-300 border border-gray-600 focus:outline-none focus:border-primary text-base"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Plot</label>
            <textarea
              value={plot}
              onChange={(e) => setPlot(e.target.value)}
              className="w-full p-2 rounded-md bg-base-300 border border-gray-600 focus:outline-none focus:border-primary text-base"
              rows="3"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Cast</label>
            <input
              type="text"
              value={cast}
              onChange={(e) => setCast(e.target.value)}
              className="w-full p-2 rounded-md bg-base-300 border border-gray-600 focus:outline-none focus:border-primary text-base"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Release Date</label>
            <input
              type="date"
              value={releaseDate}
              onChange={(e) => setReleaseDate(e.target.value)}
              className="w-full p-2 rounded-md bg-base-300 border border-gray-600 focus:outline-none focus:border-primary text-base"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Language</label>
            <input
              type="text"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full p-2 rounded-md bg-base-300 border border-gray-600 focus:outline-none focus:border-primary text-base"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Banner Image</label>
            <div className="flex gap-2 mb-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="url"
                  checked={bannerImgType === "url"}
                  onChange={(e) => setBannerImgType(e.target.value)}
                  className="mr-1"
                />
                URL
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="file"
                  checked={bannerImgType === "file"}
                  onChange={(e) => setBannerImgType(e.target.value)}
                  className="mr-1"
                />
                Upload File
              </label>
            </div>
            {bannerImgType === "url" ? (
              <input
                type="url"
                value={bannerImg}
                onChange={(e) => setBannerImg(e.target.value)}
                className="w-full p-2 rounded-md bg-base-300 border border-gray-600 focus:outline-none focus:border-primary text-base"
                placeholder="Enter banner image URL"
              />
            ) : (
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setBannerImgFile(e.target.files[0])}
                className="w-full p-2 rounded-md bg-base-300 border border-gray-600 focus:outline-none focus:border-primary text-base"
              />
            )}
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Vertical Image</label>
            <div className="flex gap-2 mb-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="url"
                  checked={verticalImgType === "url"}
                  onChange={(e) => setVerticalImgType(e.target.value)}
                  className="mr-1"
                />
                URL
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="file"
                  checked={verticalImgType === "file"}
                  onChange={(e) => setVerticalImgType(e.target.value)}
                  className="mr-1"
                />
                Upload File
              </label>
            </div>
            {verticalImgType === "url" ? (
              <input
                type="url"
                value={verticalImg}
                onChange={(e) => setVerticalImg(e.target.value)}
                className="w-full p-2 rounded-md bg-base-300 border border-gray-600 focus:outline-none focus:border-primary text-base"
                placeholder="Enter vertical image URL"
              />
            ) : (
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setVerticalImgFile(e.target.files[0])}
                className="w-full p-2 rounded-md bg-base-300 border border-gray-600 focus:outline-none focus:border-primary text-base"
              />
            )}
          </div>
          <div className="modal-action">
            <Button
              title="Cancel"
              className="bg-black hover:bg-black"
              onClick={onClose}
            />
            <Button title="Add Movie" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMovieModal;