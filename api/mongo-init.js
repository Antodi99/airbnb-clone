db = db.getSiblingDB("airbnb_clone");

db.createUser({
  user: "admin",
  pwd: "secret",
  roles: [{ role: "readWrite", db: "airbnb_clone" }],
});
