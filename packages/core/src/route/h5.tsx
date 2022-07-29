import React, { ComponentType, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router';
import { CreateRouteOptions, SiteMapType } from './types';

function createRoute<
  P extends SiteMapType,
  C extends {
    [key in keyof P]:
      | React.ReactNode
      | (() => Promise<{ default: ComponentType<any> }>);
  }
>(siteMap: P, componentMap: C, options?: CreateRouteOptions) {
  return function () {
    const keys = Object.keys(siteMap);
    const shouldLazy = keys.some((k) => typeof k === 'function');
    const children = (
      <BrowserRouter>
        <Routes>
          {keys.map((key) => {
            const item = siteMap[key];
            const component = componentMap[key];

            if (typeof component === 'function') {
              const TheComponent = React.lazy(component);
              return <Route key={item.path} element={<TheComponent />} />;
            } else {
              return <Route key={item.path} element={component} />;
            }
          })}
        </Routes>
      </BrowserRouter>
    );
    if (shouldLazy) {
      return <Suspense>{children}</Suspense>;
    } else {
      return children;
    }
  };
}

export default createRoute;
