import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import siteMap from './siteMap';

export default function App() {
  return (
    <Suspense>
      <BrowserRouter>
        <Routes>
          {Object.values(siteMap).map((item) => {
            return (
              <Route
                key={item.path}
                path={item.path}
                element={item.component}
              />
            );
          })}
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}
