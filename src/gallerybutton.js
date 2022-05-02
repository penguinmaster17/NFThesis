import React from "react";
import GalleryPage from "./gallerypage"

const GalleryButton = () => {
  return <button onClick={() => './gallerypage'}>
      <GalleryPage />
  </button>;
};

export default GalleryButton;