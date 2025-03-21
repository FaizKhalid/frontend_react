import React, { useState, useEffect } from 'react';
import { urlFor, client } from '../../client';
import { AppWrap, MotionWrap } from '../../wrapper';
import './Work.scss';

const Work = () => {
  const [works, setWorks] = useState([]);
  const [filterWork, setFilterWork] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    const query = '*[_type == "works"]';

    client.fetch(query).then((data) => {
      setWorks(data);
      setFilterWork(data);
    });
  }, []);

  const handleWorkFilter = (item) => {
    setActiveFilter(item);

    if (item === 'All') {
      setFilterWork(works);
    } else {
      setFilterWork(works.filter((work) => work.tags.includes(item)));
    }
  };

  return (
    <>
      <div className="app__work-filter">
        {['Urban', 'Museum', 'Material', 'Commercial', 'All'].map((item, index) => (
          <div
            key={index}
            onClick={() => handleWorkFilter(item)}
            className={`app__work-filter-item app__flex p-text ${activeFilter === item ? 'item-active' : ''}`}
          >
            {item}
          </div>
        ))}
      </div>

      <div className="app__work-portfolio ">
        {filterWork.map((work, index) => (
          <div className="app__work-item " key={index}>
            <div className="app__work-img ">
              <img src={urlFor(work.imgUrl)} alt={work.name} />
            </div>

            <div className="app__work-content">
              <h4 className="bold-text">{work.title}</h4>
              <div className="app__work-tag">
                <p className="p-text">{work.tags[0]}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Work, 'app__works'),
  'work',
  'app__primarybg',
);
