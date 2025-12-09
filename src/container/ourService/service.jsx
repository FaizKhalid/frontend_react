import "./service.css";
import { useEffect, useState } from "react";
import { client } from "../../client";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";
import { AppWrap, MotionWrap } from '../../wrapper';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

// Initialize image builder
const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source).url();
}

// Custom PortableText component styles
const myPortableTextComponents = {
  block: {
    h1: ({ children }) => <h1 style={{ color: "#ff5733" }}>{children}</h1>,
    h2: ({ children }) => <h2 style={{ color: "#ff5733" }}>{children}</h2>,
    h3: ({ children }) => <h3 style={{ color: "#ff5733" }}>{children}</h3>,
    normal: ({ children }) => <p style={{ color: "#333", fontSize: "16px" }}>{children}</p>,
  },
  marks: {
    strong: ({ children }) => <strong style={{ color: "#06D6A0" }}>{children}</strong>,
    em: ({ children }) => <em style={{ color: "#f9c74f" }}>{children}</em>,
  },
};

function Service() {
  const [timelineElements, setTimelineElements] = useState([]);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "serviceTimeline"]{
          _id,
          title,
          icon,
          description,
          buttonText
        }`
      )
      .then((data) => setTimelineElements(data))
      .catch(console.error);
  }, []);

  return (
    <div>
      <h1 className="service_title">Our Services</h1>
      <VerticalTimeline>
        {timelineElements.map((element) => {
          let showButton = element.buttonText;
          let iconUrl = element.icon ? urlFor(element.icon) : null;

          return (
            <VerticalTimelineElement
              key={element._id}
              iconStyle={{ background: "#06D6A0" }}
              icon={iconUrl ? <img src={iconUrl} alt={element.title} style={{ width: "100%", height: "100%" }} /> : null}
            >
              <h3 className="vertical-timeline-element-title">
                {element.title}
              </h3>
              
              {/* Rich text description with custom styles */}
              <div id="description">
                <PortableText value={element.description} components={myPortableTextComponents} />
              </div>
              
              {showButton && (
                <a className="button workButton" href="/">
                  {element.buttonText}
                </a>
              )}
            </VerticalTimelineElement>
          );
        })}
      </VerticalTimeline>
    </div>
  );
}

export default AppWrap(
  MotionWrap(Service, 'app__service'),
  'service',
);
