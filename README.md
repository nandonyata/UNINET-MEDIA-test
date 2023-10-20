## Getting Started

```bash
- npm i
- npm run start
```

## Endpoints

List of Available Endpoints:

- `POST /user/register`
- `POST /user/login`
- `POST /user/clock-in`
- `POST /user/clock-out/:id`

### POST /user/register

#### Request

- Body

```json
{
  "name": "user1",
  "password": "thisIsPassword1234",
  "email": "user1@mail.com"
}
```

#### Response

_201 - Created_

- Body

```json
{
  "code": 201,
  "user": {
    "name": "user1",
    "password": "$2a$10$DVjwbJZTyuxfL37H/mdlleRz.Bzt4TN85B.t5JLSj/CRTzqJGhNX.",
    "_id": "653248e964a4b8c4e5526e32",
    "__v": 0
  }
}
```

_401 - Bad Request_

- Body

```json
{
  "code": 400,
  "msg": "E11000 duplicate key error collection: uninet-media.users index: name_1 dup key: { name: \"nando\" }"
}
// OR
{
    "code": 400,
    "msg": "Fill All Field"
}
```

### POST /user/login

#### Request

- Body

```json
{
  "email": "user1@mail.com",
  "password": "thisIsPassword1234"
}
```

#### Response

_201 - Found_

- Body

```json
{
  "code": 201,
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5hbmRvQG1haWwuY29tIiwiaWF0IjoxNjk3Nzk1MTk5fQ.pyFqLuqDrRHfQKXeIu62cJbY0unKv_Hsk9ZsLCG6f7c",
  "findUser": {
    "_id": "65324b3383cc815ee0a9ede8",
    "name": "user1",
    "password": "$2a$10$RpRzAKEyOOWZ3BusYck/7unXCLfipi2buykt34eL6GTpWzGs9GF.C",
    "email": "user1@mail.com",
    "__v": 0
  }
}
```

_400 - Bad Request_

- Body

```json
{
  "code": 400,
  "msg": "Invalid email/password"
}
// OR
{
  "code": 400,
  "msg": "Fill All Field"
}
```

### POST /user/clock-in

#### Request

- headers

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5hbmRvQG1haWwuY29tIiwiaWF0IjoxNjk3Nzk1Njc4fQ.5wvyeM2puw9CHZzc34VgxWcyU5RDLuunAKWkZkDU10c"
}
```

- Body

```json
{
  "ipAddress": "192.21093u.1101.1",
  "longitude": "-1111",
  "latitude": "-122131"
}
```

#### Response

_201 - Created_

- Body

```json
{
  "code": 201,
  "attendance": {
    "user_id": "65324b3383cc815ee0a9ede8",
    "location": {
      "longitude": "-1111",
      "latitude": "-122131"
    },
    "ipAddress": "192.21093u.1101.1",
    "remark": "Clock in",
    "_id": "653251cccfa9401b99c06dd3",
    "createdAt": "2023-10-20T10:09:16.224Z",
    "updatedAt": "2023-10-20T10:09:16.224Z",
    "__v": 0
  }
}
```

_401 - Bad Request_

- Body

```json
{
  "code": 401,
  "msg": "User hasnt clock out last attendance"
}
```

### POST /user/clock-out/:id

#### Request

- headers

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5hbmRvQG1haWwuY29tIiwiaWF0IjoxNjk3Nzk1Njc4fQ.5wvyeM2puw9CHZzc34VgxWcyU5RDLuunAKWkZkDU12a"
}
```

- params

```json
{
  "id": "653253c63a59b0736fb92674" // attendance id
}
```

- Body

```json
{
  "ipAddress": "192.21093u.1101.1",
  "longitude": "-1111",
  "latitude": "-122131"
}
```

#### Response

_200 - Patched_

- Body

```json
{
  "code": 200,
  "message": "Clocked out",
  "findAttendance": {
    "location": {
      "longitude": 1112313,
      "latitude": 12313
    },
    "_id": "653255664a575bd61cf6af5d",
    "user_id": "65324b3383cc815ee0a9ede8",
    "ipAddress": "1w313",
    "remark": "Clock out",
    "createdAt": "2023-10-20T10:24:38.390Z",
    "updatedAt": "2023-10-20T10:24:38.390Z",
    "__v": 0
  }
}
```

_401 - Bad Request_

- Body

```json
{
  "code": 401,
  "msg": "User hasnt clock out last attendance"
}
// OR
{
  "code": 404,
  "msg": "Data Not Found"
}
```

### Global Error

#### Response

_401 - Invalid Token_

- Body
  ```json
  {
    "message": "invalid token"
  }
  ```

_403 - Forbidden_

- Body
  ```json
  {
    "message": "Forbidden"
  }
  ```

_500 - Internal Server Error_

- Body
  ```json
  {
    "message": "Internal Server Error"
  }
  ```
