import {IP} from "./constraints";

export async function login(data) {
  const response = await fetch(`http://${IP}/api/v1/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const resData = await response.json();
  if (!response.ok) {
    throw new Error(resData.message);
  }
  return resData;
}

export async function getAllTests(token) {
  const response = await fetch(`http://${IP}/api/v1/admin/tests`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const resData = await response.json();
  if (!response.ok) {
    throw new Error(resData.message);
  }
  return resData;
}

export async function getTestById(id, token = null) {
  let response;
  if (token === null) {
    response = await fetch(`http://${IP}/api/v1/tests/${id}`);
  } else {
    response = await fetch(`http://${IP}/api/v1/admin/tests/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  const resData = await response.json();
  if (!response.ok) {
    throw new Error(resData.message);
  }
  return resData;
}

export async function getQuestionsByTestId(id, token) {
  const response = await fetch(`http://${IP}/api/v1/admin/tests/${id}/questions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const resData = await response.json();
  if (!response.ok) {
    throw new Error(resData.message);
  }
  return resData;
}

export async function createTest(data, token) {
  const response = await fetch(`http://${IP}/api/v1/admin/tests`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const resData = await response.json();
  if (!response.ok) {
    throw new Error(resData.message);
  }
  return resData;
}

export async function updateTest(data, token) {
  const response = await fetch(`http://${IP}/api/v1/admin/tests/${data.id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const resData = await response.json();
  if (!response.ok) {
    throw new Error(resData.message);
  }
  return resData;
}

export async function deleteTestById(id, token) {
  const response = await fetch(`http://${IP}/api/v1/admin/tests/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const text = await response.text();
  const resData = text ? JSON.parse(text) : {};
  if (!response.ok) {
    throw new Error(resData.message);
  }

  return resData;
}

export async function getFinishedSessionsByTestId(id, token) {
  const response = await fetch(`http://${IP}/api/v1/admin/tests/${id}/finishedSessions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const resData = await response.json();
  if (!response.ok) {
    throw new Error(resData.message);
  }
  return resData;
}

export async function getFinishedSessionsByTestIdInCsv(name, id, token) {
  const response = await fetch(`http://${IP}/api/v1/admin/tests/${id}/finishedSessions/csv`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.ok) {
    const blob = await response.blob();
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `${name}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    console.error('Failed to download file');
  }
}
