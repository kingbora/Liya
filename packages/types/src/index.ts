export type SiteMapType = {
  [key: string]: {
    /**
     * for web url
     */
    path: string;
    /**
     * for rn pages
     */
    name: string;
    [key: string]: any;
  };
};

export type CreateRouteOptions = {
  
};