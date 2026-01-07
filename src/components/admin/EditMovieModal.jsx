import React from 'react'
import { useState, useEffect } from "react";
import {Button} from "../../components/ui/Buttons";
import axiosInstance from "../../config/axiosInstance";
import toast from "react-hot-toast";

const EditMovieModal = ({ movie, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({
      title: "",
      duration: "",
      genre: "",
      plot: "",
      cast: "",
      releaseDate: "",
      language: "",
      bannerImg: "",
      verticalImg: "",
    });
    const [bannerImgFile, setBannerImgFile] = useState(null);
    const [verticalImgFile, setVerticalImgFile] = useState(null);
    const [bannerImgType, setBannerImgType] = useState("url");
    const [verticalImgType, setVerticalImgType] = useState("url");
  
    useEffect(() => {
      if (movie) {
        setFormData({
          title: movie.title || "title",
          duration: movie.duration || "duration",
          genre: movie.genre?.join(", ") || "gene",
          plot: movie.plot || "plot",
          cast: movie.cast?.join(", ") || "cast",
          releaseDate: movie.releaseDate || "date",
          language: movie.language?.join(", ") || "language",
          bannerImg: movie.bannerImg || "bannerImg",
          verticalImg: movie.verticalImg || "verticalImg",
        });
      }
    }, [movie]);
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("duration", formData.duration);
      formDataToSend.append("genre", formData.genre);
      formDataToSend.append("plot", formData.plot);
      formDataToSend.append("cast", formData.cast);
      formDataToSend.append("releaseDate", formData.releaseDate);
      formDataToSend.append("language", formData.language);

      // Add images based on type
      if (bannerImgType === "url" && formData.bannerImg) {
        formDataToSend.append("bannerImg", formData.bannerImg);
      } else if (bannerImgType === "file" && bannerImgFile) {
        formDataToSend.append("bannerImg", bannerImgFile);
      }

      if (verticalImgType === "url" && formData.verticalImg) {
        formDataToSend.append("verticalImg", formData.verticalImg);
      } else if (verticalImgType === "file" && verticalImgFile) {
        formDataToSend.append("verticalImg", verticalImgFile);
      }

      try {
        const response = await axiosInstance.put(`/movie/update-movie/${movie._id}`, formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 200) {
          toast.success("Movie updated successfully!");
          onUpdate(response.data.data);
          onClose();
        }
      } catch (err) {
        const errorMessage = err.response?.data?.message || "Failed to update movie";
        toast.error(errorMessage);
        console.error("Error updating movie:", err);
      }
    };
  
    return (
      <div className="modal modal-open backdrop-blur-sm">
        <div className="modal-box max-h-[90vh] overflow-y-auto my-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-primary">EDIT MOVIE</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-base-300 border border-gray-600 focus:outline-none focus:border-primary text-base"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Duration</label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-base-300 border border-gray-600 focus:outline-none focus:border-primary text-base"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Genre (comma-separated)</label>
              <input
                type="text"
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-base-300 border border-gray-600 focus:outline-none focus:border-primary text-base"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Plot</label>
              <textarea
                name="plot"
                value={formData.plot}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-base-300 border border-gray-600 focus:outline-none focus:border-primary text-base"
                rows="3"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Cast (comma-separated)</label>
              <input
                type="text"
                name="cast"
                value={formData.cast}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-base-300 border border-gray-600 focus:outline-none focus:border-primary text-base"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Release Date</label>
              <input
                type="date"
                name="releaseDate"
                value={formData.releaseDate}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-base-300 border border-gray-600 focus:outline-none focus:border-primary text-base"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Language (comma-separated)</label>
              <input
                type="text"
                name="language"
                value={formData.language}
                onChange={handleChange}
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
                  Upload New File
                </label>
              </div>
              {bannerImgType === "url" ? (
                <input
                  type="url"
                  name="bannerImg"
                  value={formData.bannerImg}
                  onChange={handleChange}
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
                  Upload New File
                </label>
              </div>
              {verticalImgType === "url" ? (
                <input
                  type="url"
                  name="verticalImg"
                  value={formData.verticalImg}
                  onChange={handleChange}
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
                type="button"
                className="btn bg-black hover:bg-black"
                onClick={onClose}
              />
              <Button title="Update Movie" type="submit" className="btn btn-primary"/>
            </div>
          </form>
        </div>
      </div>
    );
  };

export default EditMovieModal
