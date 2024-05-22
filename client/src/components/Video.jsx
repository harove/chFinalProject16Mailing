import React from 'react';

const Video = ({ videoUrl }) => {
  return (
    <div className="mb-4">
      <video width="100%" controls>
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Video;