const guest = (to, from, next) => {
  if (!localStorage.getItem("access_token")) {
    return next();
  } else {
    return next("/home");
  }
};

const auth = (to, from, next) => {
  if (localStorage.getItem("access_token")) {
    return next();
  } else {
    return next("/login");
  }
};

const admin = (to, from, next) => {
    if (localStorage.getItem("role") == 2) {
      return next();
    } else {
      return next("/home");
    }
  };

export {
    guest ,
    auth ,
    admin
}