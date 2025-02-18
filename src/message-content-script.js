// import <MyPackage> from '../node_modules/MyPackage/dist/MyPackage.js'
// const someVariable = MyPackage.myFunction();

const showNotification = async () => {
  let notificationDetails = await browser.runtime.sendMessage({
    command: "getNotificationDetails",
  });

  // get the details back from the formerly serialized content
  const { text } = notificationDetails;

  // create the notification element itself
  const notification = document.createElement("div");
  notification.className = "thunderbirdMessageDisplayActionExample";

  // create the notification text element
  const notificationText = document.createElement("div");
  notificationText.className = "thunderbirdMessageDisplayActionExample_Text";
  notificationText.innerText = text;

  // create a button to display it in the notification
  const markUnreadButton = document.createElement("button");
  markUnreadButton.innerText = "Mark unread";
  markUnreadButton.addEventListener("click", async () => {
    // add the button event handler to send the command to the background script
    browser.runtime.sendMessage({
      command: "markUnread",
    });
  });

  // add text and button to the notification
  notification.appendChild(notificationText);
  notification.appendChild(markUnreadButton);

  // and insert it as the very first element in the message
  document.body.insertBefore(notification, document.body.firstChild);
};

showNotification();
