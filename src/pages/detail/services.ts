import { Axios } from "axios";

function createService(axios: Axios) {
  return {
    getIpLocation() {

    },
    getContent() {
      this.getContent();
    }
  };
};

export default createService;