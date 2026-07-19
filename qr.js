function createGuestID() {
  let guestID = localStorage.getItem("guestID");

  if (!guestID) {
    guestID = "guest-" + Math.random().toString(36).substring(2, 10);
    localStorage.setItem("guestID", guestID);
  }

  return guestID;
}

function getGuestID() {
  return createGuestID();
}

console.log("Guest ID:", getGuestID());
