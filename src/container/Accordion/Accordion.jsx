  import faq from "./FAQ.json";
  import { useEffect, useState } from "react";
  import { FAQItem } from './FAQItem';
  import { AppWrap,MotionWrap } from '../../wrapper';
  
  import "./Accordion.scss"

  const Accordion = () => {
    const [data, setData] = useState([]);
    const [activeId, setActiveId] = useState(false); // Track active FAQ by ID

    useEffect(() => {
      setData(faq);
    }, []);

    console.log(data);

    const handleToggle = (id) => {
      setActiveId((prevId) => (prevId === id ? false : id));
    };

    return (
      <>
      <div className="accordion">
        <h1>Accordion</h1>
        <ul className="section-accordion">
          {data &&
            data.map((curElem) => {
              const { id } = curElem;
              return (
                <FAQItem
                  key={id}
                  curData={curElem}
                  isActive={activeId === id}
                  onToggle={() => handleToggle(id)}
                />
              );
            })}
        </ul>
        </div>
      </>
    );
  };

  export default AppWrap(
    MotionWrap(Accordion, 'section_accordion'),
    'faqs',
    '',
  );
  

