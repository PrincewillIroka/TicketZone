import React from "react";
import { useNavigate } from "react-router-dom";
import ImagePlaceholder from "assets/No-Image-Placeholder.png";

function EventCard({ event }) {
  const navigate = useNavigate();
  const { title = "", venue = "", images = [] } = event;
  const imgSrc = images && images.length ? images[0] : ImagePlaceholder;

  const handleNavigate = (page) => {
    navigate(page, { state: { event } });
  };

  const getEventAlias = (title) => {
    const str = `/event-details/${title}`.toLowerCase().replace(/ /g, "-");
    return str;
  };

  const eventAlias = getEventAlias(title);

  return (
    <div className="explore-item" onClick={() => handleNavigate(eventAlias)}>
      <div className="explore-item-wallpaper">
        <img src={imgSrc} className="explore-item-img" alt="" />
      </div>
      <h3 className="explore-item-title">{title}</h3>
      <div className="explore-item-calendar">
        <span className="explore-item-date">December 31st</span>
        <span>&#8226;</span>
        <span className="explore-item-time">8:30pm</span>
      </div>
      <div className="explore-item-venue" title={venue}>
        {venue}
      </div>
    </div>
  );
}

export default EventCard;
