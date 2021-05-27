import qs from 'qs';

interface HttpResponse<T> extends Response {
  resData?: T;
}

interface RequestConfig extends RequestInit {
  params?: any;
}

export async function getData<T>(
  path: string,
  args: RequestConfig = { method: 'get' }
): Promise<HttpResponse<T>> {
  const { params } = args;
  const url = `${path}${params ? `?${qs.stringify(params)}` : ''}`;
  return await fetchData<T>(url, args);
}

export async function postData<T>(
  path: string,
  args: RequestConfig = { method: 'post' }
): Promise<HttpResponse<T>> {
  const { params } = args;
  if (params) {
    args.body = JSON.stringify(params);
  }
  return await fetchData<T>(path, args);
}

export async function fetchData<T>(url: string, args: RequestConfig): Promise<HttpResponse<T>> {
  const response: HttpResponse<T> = await fetch(url, args);
  response.resData = await response.json();
  return response;
}
