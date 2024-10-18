import httpService from "./httpService";

export const getCvs = async () => {
  return await httpService.get("/cv");
};
