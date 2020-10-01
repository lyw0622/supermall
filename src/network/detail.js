import {request} from "./request";

export function getDetail(id) {
  return {
    url: '/detail',
    params: {
      iid
    }
  }
}
