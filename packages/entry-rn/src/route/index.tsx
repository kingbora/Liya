import React, { ComponentType, Suspense } from 'react';
import { NativeRouter } from 'react-router-native';
import { Route, Routes } from 'react-router';
import { CreateRouteOptions, SiteMapType } from '@liya/types';

function createRoute<
  P extends SiteMapType,
  C extends {
    [key in keyof P]:
      | React.ReactNode
      | (() => Promise<{ default: ComponentType<any> }>);
  }
>(siteMap: P, componentMap: C, options?: CreateRouteOptions) {
  return function () {
    const shouldLazy = Object.keys(componentMap).some((k) => typeof componentMap[k] === 'function');
    const children = (
      <NativeRouter>
        <Routes>
          {Object.keys(siteMap).map((key) => {
            const item = siteMap[key];
            const component = componentMap[key];
            if (typeof component === 'function') {
              const TheComponent = React.lazy(component);
              return <Route key={item.path} path={item.path} element={<TheComponent />} />;
            } else {
              return <Route key={item.path} path={item.path} element={component} />;
            }
          })}
        </Routes>
      </NativeRouter>
    );
    if (shouldLazy) {
      return <Suspense>{children}</Suspense>;
    } else {
      return children;
    }
  };
}

export default createRoute;
