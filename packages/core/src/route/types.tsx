import React from "react";

export type SiteMapType = {
  [key: string]: {
    path: string;
    [key: string]: any;
  };
};

export type CreateRouteOptions = {
  
};