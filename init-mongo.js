db.createUser({
  user: "admin",
  pwd: "azerty",
  roles: [
    { role: "readWrite", db: "learnflowdb" }
  ]
})
db.createCollection("users")