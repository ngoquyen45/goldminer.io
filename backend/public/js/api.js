// APIs
async function postData(url, data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return await response.json();
}

// APIs
async function getData(url, header, queryParams) {
    const urlWithParams = new URL(url);
  
    if (queryParams) {
      const params = new URLSearchParams(queryParams);
      urlWithParams.search = params.toString();
    }
  
    const response = await fetch(urlWithParams, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...header
      }
    });
  
    return await response.json();
}
  
  
  