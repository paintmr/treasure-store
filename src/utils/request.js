const headers = new Headers({
  "Accept": "application/json",
  "Content-Type": "application/json"
})

function get(url) {
  return fetch(url, {
    method: "GET",
    headers: headers
  }).then(response => {
    return handleResponse(response, url);
  }).catch(err => {
    console.error(`Request failed. URL= ${url}. Message=${err}`)
    return Promise.reject({ error: { message: "Request failed." } })//为了让response继续被调用，即使在异常的情况下也继续返回promise结构。这里直接生成一个reject状态的promise
  })
}

function post(url, data) {
  return fetch(url, {
    method: "POST",
    headers: headers,
    body: data
  }).then(response => {
    handleResponse(response, url);
  }).catch(err => {
    console.error(`Request failed. URL= ${url}. Message=${err}`)
    return Promise.reject({ error: { message: "Request failed." } })
  })
}

function handleResponse(response, url) {
  if (response.status === 200) {
    return response.json();
  } else {
    console.error(`Request failed. URL= ${url}`)
    return Promise.reject({ error: { message: "Request failed due to server error" } })
  }
}

export { get, post }