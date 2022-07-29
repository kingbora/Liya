import { Axios } from "axios";

function createService(axios: Axios) {
  return {
    getIpLocation() {

    },
    getContent() {
      this.getIpLocation();
    }
  };
};

export default createService;