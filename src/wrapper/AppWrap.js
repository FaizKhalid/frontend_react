import React from 'react';
import { NavigationDots, SocialMedia } from '../components';

const AppWrap = (Component, idName, classNames, showNavDots = true, showCopyright = true) => function HOC() {
  return (
    <div id={idName} className={`app__container ${classNames}`}>
      {showNavDots && <SocialMedia />}
      <div className="app__wrapper app__flex">
        <Component />

        {showCopyright && (
          <div className="copyright">
            <p className="p-text">@2025 GOMAL STUDIO</p>
            <p className="p-text">All rights reserved</p>
          </div>
        )}
      </div>
      {showNavDots && <NavigationDots active={idName} />}
    </div>
  );
};

export default AppWrap;
