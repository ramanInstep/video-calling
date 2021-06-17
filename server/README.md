### Running the app
* `yarn start`
* navigate to `http://localhost:4000/graphql`

### Playground
- Open your browser to this address: http://localhost:4000 and run the available commands:
1. Sign Up
```graphQL
mutation {
  register(name: "admin", email: "admin@example.com", password: "123456") {
    token
  }
}
```

2. Login

```graphQL
mutation {
  login(email: "admin@example.com", password: "123456") {
    token
  }
}
```

3. List Users

```graphQL
query {
  users {
    email
    name
    id
  }
}
```

4. Add Post
```graphQL
mutation {
  addPost(
    title: "Combo House"
    body: "this is a post body"
    file: "http://modern.realhomes.io/wp-content/uploads/2015/07/property-10-exterior-680x510.jpg"
  ) {
    title
  }
}
```

5. List Post
```graphQL
query {
  posts{
    title
    id
    file
  }
}
```

6. Post added subscription
```graphQL
subscription {
  postAdded {
    title
    body
    file
  }
}
```
More Schemas..
![Schemas](/screenshots/schema.png?raw=true "Screenshot")

### testing
* run `yarn test`
