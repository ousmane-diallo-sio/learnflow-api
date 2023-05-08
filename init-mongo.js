db.createUser({
    user: "learnflowuser",
    pwd: "learnflowpwd",
    roles: [
      {role: "readWrite", db: "learnflowdb"}
    ]
})
db.createCollection("test"); //MongoDB creates the database when you first store data in that database