function useUser() {
  const savedUser = JSON.parse(localStorage.getItem("placetrack_user")) || {};
  const name    = savedUser.name  || "Student";
  const email   = savedUser.email || "";
  const initial = name.charAt(0).toUpperCase();
  return { name, email, initial };
}

export default useUser;
