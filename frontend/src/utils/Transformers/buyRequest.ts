import { buyRequestsType } from "@/utils/types/apiTypes";
import { bookReqType } from "../types/types";

export const buyRequestTransformer = (data: buyRequestsType): bookReqType[] => {
  return data.buyRequests
    .filter((request) => request.buyRequests.length !== 0)
    .map((request) => {
      const users = request.buyRequests.map((req) => ({
        ...req.user,
        reqId: req.id,
      }));
      return {
        book: request.buyRequests[0].book,
        users,
      };
    });
};
